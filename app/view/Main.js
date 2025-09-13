Ext.define('ProductsApp.view.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'ProductsApp.view.products.ProductsGrid'
    ],

    layout: 'border',

    initComponent: function() {
        var me = this;
        me.tabCounter = 1;
        me.callParent();
    },

    items: [
        {
            region: 'north',
            xtype: 'toolbar',
            height: 60,
            cls: 'main-header',
            items: [
                {
                    xtype: 'component',
                    html: '<h1 style="margin: 0; padding: 0 20px; color: white; font-size: 24px; display: inline-block;">Учет товаров</h1>'
                },
                {
                    xtype: 'button',
                    text: 'Товары',
                    cls: 'header-link',
                    style: 'color: white; background: transparent; border: none; text-decoration: none; margin-left: 20px;',
                    handler: function() {
                        var mainPanel = this.up('app-main');
                        if (mainPanel) {
                            mainPanel.openProductsTab();
                        }
                    }
                },                
                {
                    xtype: 'button',
                    text: 'Выйти',
                    cls: 'header-link',
                    style: 'color: white; background: transparent; border: none; text-decoration: none; margin-left: 10px;',
                    handler: function() {
                        var dialog = Ext.create('Ext.window.Window', {
                            title: 'Выход',
                            width: 250,
                            height: 160,
                            modal: true,
                            resizable: false,
                            closable: false,
                            closeAction: 'hide',
                            cls: 'logout-dialog',
                            layout: 'vbox',
                            items: [{
                                xtype: 'component',
                                flex: 1,
                                html: '<div style="text-align: center; font-size: 14px; color: #333; padding: 25px 20px;">Вы уверены, что хотите выйти?</div>'
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                pack: 'center',
                                align: 'center',
                                padding: '0 20px 20px 20px',
                                items: [{
                                    xtype: 'button',
                                    text: 'Да',
                                    cls: 'dialog-button',
                                    margin: '0 5px',
                                    handler: function() {
                                        dialog.close();
                                        var viewport = Ext.ComponentQuery.query('viewport')[0];
                                        viewport.destroy();
                                        Ext.create('Ext.container.Viewport', {
                                            layout: 'center',
                                            items: [{
                                                xtype: 'login'
                                            }]
                                        });
                                    }
                                }, {
                                    xtype: 'button',
                                    text: 'Нет',
                                    cls: 'dialog-button',
                                    margin: '0 5px',
                                    handler: function() {
                                        dialog.close();
                                    }
                                }]
                            }]
                        });
                        dialog.show();
                    }
                }
            ]
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            reference: 'mainTabPanel',
            items: []
        }
    ],

    openProductsTab: function() {
        var me = this;
        var tabPanel = me.down('tabpanel');
    
        if (!tabPanel) {
            Ext.Msg.alert('Ошибка', 'TabPanel не найден!');
            return;
        }
    
        var tabTitle = 'Товары ' + me.tabCounter++;
        
        try {
            var newTab = tabPanel.add({
                title: tabTitle,
                closable: true,
                layout: 'fit',
                items: [{
                    xtype: 'products-grid'
                }]
            });
            tabPanel.setActiveTab(newTab);
        } catch (error) {
            Ext.Msg.alert('Ошибка', 'Не удалось создать вкладку: ' + error.message);
        }
    }
    
});
