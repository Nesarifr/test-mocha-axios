class UserDto{
    constructor({nombre, email, edad}){
        this.fullname = nombre,
        this.email = email,
        this.edad = edad
    }
}

export const converToDto = (users) =>{
    if(Array.isArray(users)){
        const newData = users.map(user=> new UserDto(user))
        return newData
    } else {
        const newData = UserDto(users)
        return newData
    }   
}