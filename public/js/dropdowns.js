$(document).ready(function() {
    $.ajax({
        url : '/get-session-data',
        type : 'GET',
        dataType:'json'
    })
    .done(function (resp) {
        for(var i=0;i<resp.locales.length;i++) {
            let locale = resp.locales[i]
            let sel_locale = window.sessionStorage.getItem('sel_loc') || 'en-US'
            $('.ddloc').append(
                $('<option>').attr({
                    value: locale.code,
                    selected: locale.code==sel_locale ? 'selected':null
                }).text(locale.name)
            )
        }
        for(var i=0;i<resp.env.length;i++) {
            let env = resp.env[i].name 
            let sel_env = window.sessionStorage.getItem('sel_env') || 'master'
            $('.ddenv').append(
                $('<option>').attr({
                    value: env,
                    selected: env==sel_env ? 'selected':null
                }).text(env)
            )
        }
    })
    .fail(function (req, error) {
        console.log(error)
    });

    $('select.ddenv, select.ddloc').change(function () {
        let env = $('.ddenv').val()
        let loc = $('.ddloc').val()
        window.sessionStorage.setItem('sel_env', env)
        window.sessionStorage.setItem('sel_loc', loc)
        $.ajax({
            url : '/set-session-data',
            type : 'GET',
            data : {'sel_env': env, 'sel_locale': loc},
            dataType:'json',
            success: (function (resp) {
                console.log("Success ajax")
                window.location.reload()
            })
        })
    })
});
