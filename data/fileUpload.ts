import path from 'path';

const picturePath = (...fileName: string[]) => path.join(__dirname, '..', 'picture', ...fileName);

export const uploadFileData = {
  passport: picturePath('passport.jpg'),
  idcat: picturePath('idcat.png'),
  forUpload: picturePath('ForUpload.jpeg'),
  idCardPdf: picturePath('ID_Card_Example.pdf'),
};