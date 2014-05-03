module.exports = function (grunt) {
    //описываем конфигурацию 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные
 
        concat: {  //описываем работу плагина конкатенации
            dist: {
                src: [
                'js/jquery.min.js', 
                'js/bootstrap.min.js', 
                'js/handlebars.js', 
                'js/jquery-ui-1.10.4.custom.min.js',
                'js/common.js'
                ],  // какие файлы конкатенировать
                dest: 'dest/build.js'  // куда класть файл, который получиться после процесса конкатенации 
            }
        },
 
        uglify: {  //описываем работу плагина минификации js - uglify.
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
            },
 
            build: {
                src: 'dest/build.js',  // какой файл минифицировать
                dest: 'dest/build.min.js' // куда класть файл, который получиться после процесса минификации
            }
        },
 
        cssmin: { //описываем работу плагина минификации и конкатенации css.
            with_banner: {
                options: {
                    banner: '/* My minified CSS */'  //комментарий который будет в output файле.
                },
 
                files: {
                    'dest/style.min.css' : [
                    'css/bootstrap.min.css', 
                    'css/jquery-ui-1.10.4.custom.min.css', 
                    'css/style.css' 
                    ]   // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
                }
            }
        },


        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['js/*.js'],  //следить за всеми js файлами в папке src
                tasks: ['concat', 'uglify']  //при их изменении запускать следующие задачи
            },
            css: {
                files: ['css/*.css'], //следить за всеми css файлами в папке src
                tasks: ['cssmin'] //при их изменении запускать следующую задачу
            }
        }
 
 
    });
 
    //подгружаем необходимые плагины 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch'); 
 
 
    //регистрируем задачу 
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']); //задача по умолчанию, просто grunt
    grunt.registerTask('test', ['']); //пока пусто, но кто знает, возможно в следующих уроках мы этим воспользуемся <img src="http://loftblog.ru/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley"> 
};

