module.exports = (app)=>{
    app.use('/posts', require('./routes/posts'));
    app.use('/users', require('./routes/users'));
    app.use('/organizations', require('./routes/organizations'));
    app.use('/tags', require('./routes/tags'));
    app.use('/comments', require('./routes/comments'));
    app.use('/locale',require('./routes/locale'));
    app.use('/auth', require('./routes/auth'));
    app.use('/site',require('./routes/site'));
    app.use('/admin',require('./routes/admin'));
    app.use('/user_actions',require('./routes/user_actions'));
    app.use('/categories',require('./routes/categories'));
}