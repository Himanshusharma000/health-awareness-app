import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

RNG=np.random.default_rng(42)
n=1500
age=RNG.integers(18,75,n)
tenure=RNG.integers(1,72,n)
monthly=RNG.normal(75,25,n).clip(20,180)
support=RNG.poisson(2,n)
usage=RNG.normal(55,18,n).clip(5,100)
contract=RNG.choice(['Month-to-month','One year','Two year'],n,p=[.55,.25,.20])
logit=(-1.8 + .025*(monthly-70) + .35*(contract=='Month-to-month') + .08*support - .018*tenure - .025*(usage-50) + .003*(age-40))
prob=1/(1+np.exp(-logit))
churn=RNG.binomial(1,prob)
df=pd.DataFrame({'age':age,'tenure_months':tenure,'monthly_charge':monthly.round(2),'support_tickets':support,'usage_score':usage.round(2),'contract':contract,'churn':churn})
X=pd.get_dummies(df.drop(columns='churn'),columns=['contract'],drop_first=True)
y=df['churn']
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=.2,stratify=y,random_state=42)
models={
 'Logistic Regression':Pipeline([('scale',StandardScaler()),('model',LogisticRegression(max_iter=1000))]),
 'Random Forest':RandomForestClassifier(n_estimators=250,max_depth=10,random_state=42),
 'Gradient Boosting':GradientBoostingClassifier(random_state=42)
}
print(f'Dataset shape: {df.shape} | churn rate: {y.mean():.2%}\n')
results=[]
for name,model in models.items():
    model.fit(X_train,y_train); pred=model.predict(X_test)
    row=[name,accuracy_score(y_test,pred),precision_score(y_test,pred,zero_division=0),recall_score(y_test,pred,zero_division=0),f1_score(y_test,pred,zero_division=0)]
    results.append(row)
    print(name);print(classification_report(y_test,pred,digits=3))
print(pd.DataFrame(results,columns=['Model','Accuracy','Precision','Recall','F1']).sort_values('F1',ascending=False).to_string(index=False))
