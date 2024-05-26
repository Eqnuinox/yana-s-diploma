import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
});

const Token = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING }
});

const Course = sequelize.define('course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
});

const Test = sequelize.define('test', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    body: { type: DataTypes.JSON },
    passCondition: { type: DataTypes.INTEGER }
});

const Retries = sequelize.define('retries', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER },
    test_id: { type: DataTypes.INTEGER }
});

const Result = sequelize.define('result', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    isPassed: { type: DataTypes.BOOLEAN },
    result: { type: DataTypes.JSON }
});

User.hasMany(Course, { foreignKey: 'user_id', as: 'course_users' });
Course.belongsTo(User, { foreignKey: 'user_id', as: 'course_users' });

User.hasOne(Token, { foreignKey: 'user_id', as: 'user_refresh_token' });
Token.belongsTo(User, { foreignKey: 'user_id', as: 'user_refresh_token' });

Course.hasMany(User, { foreignKey: 'course_id', as: 'user_courses' });
User.belongsTo(Course, { foreignKey: 'course_id', as: 'user_courses' });

Test.hasMany(Course, { foreignKey: 'test_id', as: 'course_tests' });
Course.belongsTo(Test, { foreignKey: 'test_id', as: 'course_tests' });

Retries.hasMany(Test, { foreignKey: 'retries_id', as: 'tests_retries' });
Test.belongsTo(Retries, { foreignKey: 'retries_id', as: 'tests_retries' });

User.hasOne(Retries, { foreignKey: 'user_id', as: 'user_retries' });
Retries.belongsTo(User, { foreignKey: 'user_id', as: 'user_retries' });

Result.hasMany(User, { foreignKey: 'result_id', as: 'user_results' });
User.belongsTo(Result, { foreignKey: 'result_id', as: 'user_results' });

Test.hasOne(Result, { foreignKey: 'test_id', as: 'test_results' });
Result.belongsTo(Test, { foreignKey: 'test_id', as: 'test_results' });

export { User, Course, Test, Retries, Result, Token };
