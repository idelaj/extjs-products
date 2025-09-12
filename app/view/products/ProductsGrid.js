Ext.define('ProductsApp.view.products.ProductsGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'products-grid',

    requires: [
        'ProductsApp.store.ProductsStore'
    ],

    layout: 'border',

    items: [
        {
            region: 'north',
            xtype: 'form',
            height: 80,
            bodyPadding: 10,
            border: false,
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'ID товара',
                            name: 'productId',
                            width: 200,
                            margin: '0 10 0 0',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: function(field, e) {
                                    if (e.getKey() === e.ENTER) {
                                        this.up('products-grid').applyFilters();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Описание товара',
                            name: 'productDescription',
                            width: 300,
                            margin: '0 10 0 0',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: function(field, e) {
                                    if (e.getKey() === e.ENTER) {
                                        this.up('products-grid').applyFilters();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Сбросить фильтры',
                            margin: '0 0 0 10',
                            handler: function() {
                                var form = this.up('form');
                                form.getForm().reset();
                                this.up('products-grid').applyFilters();
                            }
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype: 'grid',
            store: {
                type: 'productsstore'
            },
            columns: [
                {
                    text: 'ID',
                    dataIndex: 'id',
                    width: 80,
                    align: 'center'
                },
                {
                    text: 'Название',
                    dataIndex: 'name',
                    flex: 1,
                    minWidth: 150
                },
                {
                    text: 'Описание',
                    dataIndex: 'description',
                    flex: 2,
                    minWidth: 200
                },
                {
                    text: 'Цена',
                    dataIndex: 'price',
                    width: 120,
                    align: 'right',
                    renderer: function(value) {
                        return Ext.util.Format.currency(value, '₽', 2);
                    }
                },
                {
                    text: 'Количество',
                    dataIndex: 'quantity',
                    width: 120,
                    align: 'center',
                    renderer: function(value, metaData, record) {
                        if (value === 0) {
                            metaData.style = 'background-color: #ffcdd2; color: #c62828; font-weight: bold;';
                        }
                        return value;
                    }
                }
            ],
            viewConfig: {
                stripeRows: true
            }
        }
    ],

    applyFilters: function() {
        var form = this.down('form');
        var values = form.getForm().getValues();
        var store = this.down('grid').getStore();
        
        store.clearFilter();
        
        if (values.productId) {
            store.filter('id', values.productId);
        }
        
        if (values.productDescription) {
            store.filter('description', values.productDescription, true, false);
        }
    }
});
