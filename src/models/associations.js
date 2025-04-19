// models/associations.ts
// import UserModel from './users/UserModel';
// import RolModel from './roles/RolModel';
// import ClubModel from './clubs/ClubModel';

import { Users } from './users.js'
import { Roles }from './roles.js'
import { Provinces } from './provinces.js';
import { Customers } from './customers.js';
import { Tax_Condition } from './tax_condition.js';

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

Customers.belongsTo(Provinces,
    { 
        foreignKey: 'id_province', 
        targetKey: 'id' 
    }
);
Customers.belongsTo(Tax_Condition,
    { 
        foreignKey: 'id_tax_condition', 
        targetKey: 'id' 
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
