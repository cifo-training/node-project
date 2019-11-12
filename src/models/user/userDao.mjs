import User from './user.mjs';

const create = async (data) => {
    const user = new User();
    Object.assign(user, data);
    return user.save();
};
const userByName = async (name) => {

    return await User.find({ name }).exec();
}

const checkUser = async (data) => {

    return await User.findOne(data).lean().exec();
}

export default {
    create,
    checkUser,
    userByName
}