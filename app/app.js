Ext.application({
  name: 'ProductsApp',

  requires: [
      'ProductsApp.view.login.Login',
      'ProductsApp.view.Main',
      'ProductsApp.view.products.ProductsGrid',
      'ProductsApp.model.Product'
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