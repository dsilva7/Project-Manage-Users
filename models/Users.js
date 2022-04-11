class User {

    constructor(name, gender, birth, country, email, password, photo, admin ){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        

    }

    get id(){

        return this._id;
    }

    get register (){

        return this._register;        

    }
 

    get name(){

        return this._name;

    }

    get gender(){

        return this._gender;

    }

    get birth(){

        return this._birth;

    }

    get country(){

        return this._country
        
    }

    get email(){

        return this._email;

    }

    get password(){

        return this._password;

    }

    get photo(){

        return this._photo;

    }

    set photo(value){

        this._photo = value;

    }

    get admin(){

        return this._admin;

    }

    //method used to load JSON from users. 
    loadFromJSON(json){

        for(let name in json){

            switch(name){

                case '_register':
                    this[name] = new Date(json[name]);
                break;
                
                default:
                    this[name] = json[name];

            }

            
        }

    }

    //method static for captur users created in localStorage.
    static getUsersStorage(){

        let users = [];

        if(localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }

        return users

    }

    //method used for valid if has a ID otherwise create a new ID.
    getNewId(){

        let usersId = parseInt(localStorage.getItem("usersId"));

        if(!usersId > 0) usersId = 0;

        usersId++;

        localStorage.setItem("usersId",usersId);

        return usersId;

    }

    //method used for save users in localStorage.
    save(){

        let users = User.getUsersStorage();

        if(this.id > 0) {

            users.map(u => {

                if(u._id == this.id){

                    Object.assign(u, this);

                }

                return u;

            });  

        } else {

            this._id = this.getNewId();

            users.push(this);

        }

        localStorage.setItem("users", JSON.stringify(users));   

    }

    //method used remove users in localStorage.
    remove(){

        let users = User.getUsersStorage();

        users.forEach((userData, index)=>{

            if(this._id == userData._id){

                users.splice(index, 1);

            }

        });

        localStorage.setItem("users", JSON.stringify(users));  

    }

}