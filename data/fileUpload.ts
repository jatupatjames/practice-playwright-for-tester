import path from 'path';

const picturePath = (...fileName: string[]) => path.join(process.cwd(), 'picture', ...fileName);

export const uploadFileData = {
  passport: picturePath('passport.jpg'),
  idcat: picturePath('idcat.png'),
  forUpload: picturePath('ForUpload.jpeg'),
};
