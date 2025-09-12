Ext.define('ProductsApp.view.login.Login', {
    extend: 'Ext.panel.Panel',
    xtype: 'login',

    requires: [
        'Ext.form.Panel'
    ],

    title: 'Авторизация',
    width: 350,
    bodyPadding: 15,
    border: true,
    shadow: true,
    cls: 'login-card',

    layout: 'fit',

    items: {
        xtype: 'form',
        reference: 'form',
        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'none'
        },
        items: [
            {
                xtype: 'component',
                itemId: 'errorText',
                hidden: true,
                style: 'color:#c62828; margin-bottom:8px;',
                html: 'Неверный логин/пароль'
            },
            {
                name: 'username',
                fieldLabel: 'Логин'
            },
            {
                name: 'password',
                fieldLabel: 'Пароль',
                inputType: 'password'
            }
        ],
        buttons: [
            {
                text: 'Войти',
                formBind: true,
                handler: function (btn) {
                    var formPanel = btn.up('form'),
                        form = formPanel.getForm(),
                        values = form.getValues(),
                        errorText = formPanel.down('#errorText');

                    form.clearInvalid();
                    errorText.hide();

                    if (values.username === 'admin' && values.password === 'padmin') {
                        Ext.Msg.alert('Успех', 'Вы вошли!');
                        form.reset();
                        // TODO: main page
                    } else {
                        form.markInvalid({
                            username: 'Неверный логин/пароль',
                            password: 'Неверный логин/пароль'
                        });
                        errorText.show();
                    }
                }
            }
        ]
    }
});
