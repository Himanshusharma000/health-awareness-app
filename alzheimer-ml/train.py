import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

X,y=make_classification(n_samples=1600,n_features=24,n_informative=12,n_redundant=4,class_sep=1.1,random_state=42)
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=.2,stratify=y,random_state=42)
models={
 'PCA + Logistic Regression':Pipeline([('scale',StandardScaler()),('pca',PCA(n_components=.90,random_state=42)),('model',LogisticRegression(max_iter=2000))]),
 'Random Forest':RandomForestClassifier(n_estimators=250,max_depth=10,random_state=42),
 'Gradient Boosting':GradientBoostingClassifier(random_state=42)
}
for name,model in models.items():
    model.fit(X_train,y_train);pred=model.predict(X_test)
    p,r,f,_=precision_recall_fscore_support(y_test,pred,average='binary',zero_division=0)
    print(f'{name}: accuracy={accuracy_score(y_test,pred):.3f}, precision={p:.3f}, recall={r:.3f}, f1={f:.3f}')
