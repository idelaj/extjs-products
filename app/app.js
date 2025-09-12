Ext.application({
  name: 'ProductsApp',

  requires: [
    'ProductsApp.view.login.Login'
  ],

  launch: function () {
      Ext.create('Ext.container.Viewport', {
          layout: 'center', 
          items: [
              {
                  xtype: 'login'
              }
          ]
      });
  }
});
