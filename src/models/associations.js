// models/associations.ts
// import UserModel from './users/UserModel';
// import RolModel from './roles/RolModel';
// import ClubModel from './clubs/ClubModel';

import { Users } from './users.js'
import { Roles }from './roles.js'
import { Provinces } from './provinces.js';
import { Customers } from './customers.js';

export default function associations() {
    

Users.belongsTo(Roles, 
    { 
        foreignKey: 'id_rol',
        targetKey: 'id_rol'
    }
);

Customers.belongsTo(Users, 
    { 
        foreignKey: 'id_user', 
        targetKey: 'id_user' 
    }
);

// ClubModel.hasMany(UserModel,
//     {
//         foreignKey: 'id_club',
//         sourceKey: 'id'
//     }
// );
    
// y si ClubModel.hasMany(UserModel) también, agregalo aquí

}
