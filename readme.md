### 1/ GET /persons 
    => retourne la liste des personnes créées.
    
### 2/ POST /persons 
    => Créer une nouvelle instance de Person avec les infos du body de la request   
    et la persist dans la base de donnée.
    
### 3/ DELETE /persons/:name 
    => Delete toutes les personnes qui ont pour name `:name` 
 
### 4/ 404 NOT FOUND
    => Pour tout autre route, renvoyer un code 404. 
