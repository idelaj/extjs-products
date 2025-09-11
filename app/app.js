Ext.application({
  name: 'ProductsApp',
  launch: function () {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
        xtype: 'panel',
        title: 'Login',
        bodyPadding: 10,
        items: [
          { xtype: 'textfield', fieldLabel: 'Логин', itemId: 'loginField' },
          { xtype: 'textfield', fieldLabel: 'Пароль', inputType: 'password', itemId: 'pwdField' },
          { xtype: 'button', text: 'Вход', margin: '10 0 0 0', handler: function(btn){
            var p = btn.up('panel'),
                l = p.down('#loginField').getValue(),
                pw = p.down('#pwdField').getValue();
            if (l === 'admin' && pw === 'padmin') {
              Ext.Msg.alert('OK', 'Успешно');
              // TODO: products page
            } else {
              Ext.Msg.alert('Ошибка', 'Неверный логин/пароль');
            }
          }}]
      }]
    });
  }
});
