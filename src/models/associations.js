// models/associations.ts
// import UserModel from './users/UserModel';
// import RolModel from './roles/RolModel';
// import ClubModel from './clubs/ClubModel';

import { Users } from './users.js'
import { Roles }from './roles.js'
import { Provinces } from './provinces.js';
import { Customers } from './customers.js';

Users.belongsTo(Roles, 
    { 
        foreignKey: 'id_rol',
        targetKey: 'id'
    }
);


Users.belongsTo(Customers, 
    { 
        foreignKey: 'id_club', 
        targetKey: 'id' 
    }
);

ClubModel.hasMany(UserModel,
    {
        foreignKey: 'id_club',
        sourceKey: 'id'
    }
);
    
// y si ClubModel.hasMany(UserModel) también, agregalo aquí

export {
  UserModel,
  RolModel,
  ClubModel,
};
