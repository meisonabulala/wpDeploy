import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();

// export an anonymous object
export default{
  connect :() => {
    // console.log(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser : true,
      useUnifiedTopology : true
    }).then((res) => {
      console.log("mogos connection created\n");
    })
  }
}