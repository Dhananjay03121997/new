const project = '/sample-project';
module.exports={
    crud:{
        add:`${project}/{{name}}/add`,
        delete:`${project}/{{name}}/delete`,
        update:`${project}/{{name}}/update`,
        get:`${project}/{{name}}/get`,
    },
    login:{
        login:`${project}/login`
    }
}