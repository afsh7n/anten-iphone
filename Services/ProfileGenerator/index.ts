import {UUID} from "crypto";

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

enum TypeOperator {
    HamrahAval = 'HamrahAval',
    Irancell = 'Irancell',
    Rightel = 'Rightel'
}

// @ts-ignore
export const generateProfile = (typeOperator: TypeOperator): string => {
    // Generate two random UUIDs
    const uuid1 = uuid.v4();
    const uuid2 = uuid.v4();
    const filePath = path.join(__dirname, `template/${typeOperator}.mobileconfig`);
    const file = fs.readFileSync(filePath, 'utf8');
    const newFile = file.replace(/\$UUID1/g, uuid1).replace(/\$UUID2/g, uuid2);

    //generate new file name
    const randomInt = Math.floor(Math.random() * 900000) + 100000;
    const name = `${typeOperator}-${randomInt}.mobileconfig`;
    const newFilePath = path.join(__dirname, `../../temp/${name}`);
    fs.writeFileSync(newFilePath, newFile);

    //return the full path
    return newFilePath;
}