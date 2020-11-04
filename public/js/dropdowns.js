$(document).ready(function () {
    function buildDropDowns(availableLocales, availableEnvs) {
        let sel_env = getStorageItem('sel_env') || 'master'
        let sel_locale = getStorageItem('sel_loc') || 'en-US'
        let locales = availableLocales[sel_env];
        $('.ddloc').html('')
        $('.ddenv').html('')
        for (var i = 0; i < locales.length; i++) {
            let locale = locales[i]
            $('.ddloc').append(
                $('<option>').attr({
                    value: locale.code,
                    selected: locale.code == sel_locale ? 'selected' : null
                }).text(locale.name)
            )
        }
        for (var i = 0; i < availableEnvs.length; i++) {
            let env = availableEnvs[i].name
            $('.ddenv').append(
                $('<option>').attr({
                    value: env,
                    selected: env == sel_env ? 'selected' : null
                }).text(env)
            )
        }
    }
    
    function getStorageItem(key) {
        return JSON.parse(window.sessionStorage.getItem(key));
    }


    function setStorageItem(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    }
    let availableEnvs = getStorageItem('env') || []
    let availableLocales = getStorageItem('locales') || {}
    if (!availableEnvs.length) {
        $.ajax({
            url: '/get-session-data',
            type: 'GET',
            dataType: 'json'
        })
            .done(function (resp) {
                setStorageItem('env', resp.env)
                setStorageItem('locales', resp.locales)
                buildDropDowns(resp.locales, resp.env);
            })
            .fail(function (req, error) {
                console.log(error)
            });
    } else {
        buildDropDowns(availableLocales, availableEnvs);
    }



    $('select.ddenv, select.ddloc').change(function () {
        let env = $('.ddenv').val()
        let loc = $('.ddloc').val()
        if (env != getStorageItem('sel_env')) {
            loc = getStorageItem('locales')[env][0].code;
        }
        setStorageItem('sel_env', env)
        setStorageItem('sel_loc', loc)
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

        buildDropDowns(getStorageItem('locales'), getStorageItem('env'))
    })
});
