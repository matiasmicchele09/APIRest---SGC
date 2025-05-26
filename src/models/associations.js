// models/associations.ts
// import UserModel from './users/UserModel';
// import RolModel from './roles/RolModel';
// import ClubModel from './clubs/ClubModel';

import { Banks } from './banks.js';
import { Customers } from './customers.js';
import { Provinces } from './provinces.js';
import { Roles }from './roles.js'
import { Sex } from './sex.js';
import { Tax_Condition } from './tax_condition.js';
import { Types_person } from './types_person.js';
import { Users } from './users.js'

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

    Customers.belongsTo(Banks,
        { 
            foreignKey: 'id_bank', 
            targetKey: 'id_bank' 
        }
    );

    Customers.belongsTo(Sex,
        {
            foreignKey: 'id_sex',
            targetKey: 'id_sex'
        }
    );

    Customers.belongsTo(Types_person,
        {
            foreignKey: 'id_type',
            targetKey: 'id_type'
        }
    );
}
