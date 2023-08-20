export const schema = {
  data: {
    blockTradeInfo: {
      id: 'blockTradeInfo',
      tag: 'blockTradeInfo',
      type: 'cbublock',
      fields: {
        label: '销售信息',
        uiType: 'cbublock'
      },
      position: 'body'
    },
    importProp: {
      id: 'importProp',
      tag: 'importProp',
      type: 'cbu_import_prop',
      fields: {
        uiType: 'cbu_import_prop',
        label: '进口属性',
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        value: {
          hasOriginCountryCert: 'N',
          isImportOffer: 'N',
          importWareHouse: 'CustomsCleared',
          importWareDate: '2',
          isImportMember: false,
          tpIsImportable: false,
          isImportHighRiskCategory: false,
          empty: false
        }
      },
      position: 'body'
    },
    primaryVideo: {
      id: 'primaryVideo',
      tag: 'primaryVideo',
      type: 'cbu_video',
      fields: {
        uiType: 'cbu_video',
        label: '商品视频',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        promote: {
          top: '时长需≤60秒，尺寸建议为1:1。<em>建议突出商品核心卖点，主图视频有助于提高成交转化率</em><a target="_blank" href="/page/redirect.html?name=videoManage">管理视频</a>'
        },
        asyncCheck: false,
        showType: 'video',
        activeIntroVideo: true
      },
      position: 'body'
    },
    assistBoard: {
      id: 'assistBoard',
      tag: 'assistBoard',
      type: 'cbu_assist_board',
      fields: {
        uiType: 'cbu_assist_board',
        label: '发布助手',
        info: {},
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false
      },
      position: 'body'
    },
    cbulayout_35496: {
      id: '35496',
      tag: 'Root',
      type: 'cbulayout'
    },
    productLine: {
      id: 'productLine',
      tag: 'productLine',
      type: 'cbuselect',
      fields: {
        uiType: 'cbuselect',
        label: '产品线',
        info: {},
        required: false,
        readonly: false,
        size: 'small',
        promote: {
          right:
            '<a target="_blank" href="https://channel.1688.com/page/offergroup.htm">管理产品线</a>'
        },
        asyncCheck: false,
        placeholder: '请选择产品线'
      },
      position: 'body'
    },
    industrySelectVideo: {
      id: 'industrySelectVideo',
      tag: 'industrySelectVideo',
      type: 'cbu_industry_select_videos',
      fields: {
        uiType: 'cbu_industry_select_videos',
        label: '商品视频',
        info: {},
        required: false,
        readonly: false,
        visible: false,
        asyncCheck: false
      },
      position: 'body'
    },
    suttleWeight: {
      id: 'suttleWeight',
      tag: 'suttleWeight',
      type: 'cbunumber',
      fields: {
        uiType: 'cbunumber',
        label: '跨境包裹重量',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'small',
        promote: {
          right: '加入海外一件代发后，系统会按照该重量计算跨境物流运费'
        },
        asyncCheck: false,
        precision: 4
      },
      position: 'body'
    },
    beginAmount: {
      id: 'beginAmount',
      tag: 'beginAmount',
      type: 'cbu_begin_amount',
      fields: {
        uiType: 'cbu_begin_amount',
        label: '最小起订量',
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        referAmount: 2
      },
      position: 'body'
    },
    processPriceTpl: {
      id: 'processPriceTpl',
      tag: 'processPriceTpl',
      type: 'cbu_light_price_tpl',
      fields: {
        uiType: 'cbu_light_price_tpl',
        label: '定制服务报价',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'medium',
        asyncCheck: false,
        allowCustom: true,
        allowOffice: false
      },
      position: 'body'
    },
    upshelfTime: {
      id: 'upshelfTime',
      tag: 'upshelfTime',
      type: 'cbushelftime',
      fields: {
        uiType: 'cbushelftime',
        label: '上架时间',
        info: {},
        required: true,
        readonly: false,
        asyncCheck: false,
        dataSource: [
          {
            value: 1,
            text: '立即上架'
          },
          {
            value: 2,
            text: '定时开售',
            help: '选择定时开售的商品，开售前旺铺、搜索以及商品详情买家可见，商品开售以后正常售卖'
          }
        ],
        value: {
          value: 1,
          extValue: null,
          subText: null
        }
      },
      position: 'body'
    },
    tradeTemplate: {
      id: 'tradeTemplate',
      tag: 'tradeTemplate',
      type: 'cbu_trade_mode',
      fields: {
        uiType: 'cbu_trade_mode',
        label: '交易方式',
        required: false,
        readonly: false,
        size: 'medium',
        promote: {},
        asyncCheck: false,
        value: {
          steppayTemplateId: null,
          processTemplateIds: [],
          isWholeShop: false,
          wholeShopName: null
        },
        processTemplateList: [
          {
            id: 73,
            name: '91分阶段付款',
            help: '买家下单后90天内支付90%首付款后卖家发货，买家需在15天内确认收货；然后买家支付10%尾款后交易完成，款项直接进入卖家账户。'
          }
        ]
      },
      position: 'body'
    },
    quotationType: {
      id: 'quotationType',
      tag: 'quotationType',
      type: 'cburadio',
      fields: {
        uiType: 'cburadio',
        label: '报价方式',
        info: {},
        required: true,
        readonly: false,
        visible: true,
        size: 'medium',
        asyncCheck: false,
        dataSource: [
          {
            value: 2,
            text: '按产品数量报价',
            help: '<img src="https://img.alicdn.com/tfs/TB1l_HWGeT2gK0jSZFvXXXnFXXa-1186-722.png">可根据买家采购的不同数量设置不同价格。'
          },
          {
            value: 1,
            text: '按产品规格报价',
            help: '<img src="https://img.alicdn.com/tfs/TB1sj2ZGeH2gK0jSZFEXXcqMpXa-1168-696.png">可根据产品的不同规格设置不同的价格和数量。'
          }
        ]
      },
      position: 'body'
    },
    cbuSendAddress: {
      id: 'cbuSendAddress',
      tag: 'cbuSendAddress',
      type: 'cbu_send_address',
      fields: {
        uiType: 'cbu_send_address',
        label: '发货地址',
        required: true,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        dataSource: [
          {
            value: 32583873,
            text: '广东省 广州市 越秀区 广园东路西坑厚街22号'
          }
        ],
        value: {
          value: 32583873
        }
      },
      position: 'body'
    },
    seven_day: {
      id: 'seven_day',
      tag: 'seven_day',
      type: 'cbucheckbox',
      fields: {
        uiType: 'cbucheckbox',
        label: '无理由退货',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'medium',
        promote: {
          bottom:
            '<div class="warn">勾选此项，您的产品展示页面上将标明“本产品支持七天无理由退货”，您应履行服务承诺<br>     如不勾选，您的产品展示页面上将标明“本产品采购属于商业贸易行为”，可不适用“七天无理由退货” (交易双方另有约定的除外)</div>'
        },
        asyncCheck: false,
        dataSource: [
          {
            value: 32450,
            text: '支持7天无理由退货'
          }
        ],
        maxItems: 5,
        multiple: true
      },
      position: 'body'
    },
    blockLogistics: {
      id: 'blockLogistics',
      tag: 'blockLogistics',
      type: 'cbublock',
      fields: {
        label: '物流信息',
        uiType: 'cbublock',
        promote: {
          right:
            '<a href=\'https://56.1688.com/\' target=\'_blank\'>阿里巴巴推荐物流，运费低至8折！</a>'
        }
      },
      position: 'body'
    },
    Root: {
      id: 'Root',
      tag: 'Root',
      type: 'cbulayout',
      fields: {
        uiType: 'cbulayout',
        info: {},
        className: 'default',
        size: 'medium',
        asyncCheck: false
      },
      position: 'body'
    },
    invReduce: {
      id: 'invReduce',
      tag: 'invReduce',
      type: 'cburadio',
      fields: {
        uiType: 'cburadio',
        label: '库存扣减设置',
        info: {},
        required: true,
        readonly: false,
        visible: true,
        size: 'medium',
        promote: {
          right:
            '部分场景库存扣减方式与产品设置无关，如：伙拼及疯狂店促固定为付款减库存'
        },
        asyncCheck: false,
        dataSource: [
          {
            value: '1',
            text: '下单时扣减',
            help: '下单时扣减，存在恶拍风险'
          },
          {
            value: '2',
            text: '支付时扣减',
            help: '支付时扣减，影响买家体验，请慎重设置'
          }
        ]
      },
      position: 'body'
    },
    weight: {
      id: 'weight',
      tag: 'weight',
      type: 'cbunumber',
      fields: {
        uiType: 'cbunumber',
        label: '按商品设置重量',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'small',
        promote: {
          right:
            '运费模板将基于商品重量（含包装）统一计算运费，不同规格运费相同。如果是抛货，请用长*宽*高（cm³）/5000来换算重量。比如一个商品长宽高为50*70*80（cm³），则其重量=50*70*80/5000=56kg'
        },
        asyncCheck: false,
        precision: 4
      },
      position: 'body'
    },
    catNamer: {
      id: 'catNamer',
      tag: 'catNamer',
      type: 'cbu_cat_namer',
      fields: {
        uiType: 'cbu_cat_namer',
        label: '您选择的类目',
        info: {},
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        value: {
          chooseCategoryUrl:
            'https://offer.1688.com/offer/post/choose_category.htm',
          pathList: [
            {
              categoryId: 71,
              name: '汽摩及配件'
            },
            {
              categoryId: 10106,
              name: '制动系统'
            },
            {
              categoryId: 1032176,
              name: '刹车片'
            }
          ]
        }
      },
      position: 'body'
    },
    iecProp: {
      id: 'iecProp',
      tag: 'iecProp',
      type: 'cbu_iec_prop',
      fields: {
        uiType: 'cbu_iec_prop',
        label: '产品认证',
        required: false,
        readonly: false,
        size: 'medium',
        promote: {
          top: '如您已持有TUV（莱茵）产品认证证书，请填写报告上的纯数字证书号以及Blatt Page纯数字编码（无需空格）',
          bottom:
            '<div class=\'warn\'>填写上栏产品认证证书编号，即为确认授权该证书出具机构等向阿里巴巴提供该证书对应的产品检测认证数据，包括公司名、证书号、地址、类型、检测标准、产品名称、规格参数、证书有效期等并加以展示（如为非自身产品，确认已获取产品方同意可作出前述授权确认），且可超链接自证书出具机构网站，便于用户查询确认。如无法确认，请勿填写</div>'
        },
        asyncCheck: false
      },
      position: 'body'
    },
    saleProp: {
      id: 'saleProp',
      tag: 'saleProp',
      type: 'cbu_specs',
      fields: {
        uiType: 'cbu_specs',
        label: '产品规格',
        info: {},
        required: false,
        promote: {
          top: '<div class="warn">请规范使用SKU属性，如有滥用的行为，商品会被降权<a target="_blank" href="/page/redirect.html?name=skuNamesNorm">查看规范</a></div>'
        },
        asyncCheck: false,
        dataSource: [
          {
            name: 'p-361',
            uiType: 'input',
            label: '产品规格',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 361,
            fieldType: 'string',
            propType: 'sale',
            maxItems: 100,
            maxCustomItems: 100,
            customizable: true,
            expandable: true,
            supportImg: true,
            maxLength: 50
          },
          {
            name: 'p-404',
            uiType: 'input',
            label: '颜色',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 404,
            fieldType: 'string',
            propType: 'sale',
            maxItems: 100,
            maxCustomItems: 100,
            customizable: true,
            expandable: true,
            maxLength: 50,
            colorProp: true
          }
        ],
        originDataSource: [],
        value: {}
      },
      position: 'body'
    },
    volume: {
      id: 'volume',
      tag: 'volume',
      type: 'cbu_volume',
      fields: {
        uiType: 'cbu_volume',
        label: '商品体积',
        info: {},
        required: false,
        readonly: false,
        size: 'small',
        promote: {
          bottom:
            '加入海外一件代发后，针对抛货(如棉花)系统将按体积和重量数据，折算成体积重计算运费'
        },
        asyncCheck: false,
        value: {
          height: null,
          width: null,
          length: null
        }
      },
      position: 'body'
    },
    blockDescription: {
      id: 'blockDescription',
      tag: 'blockDescription',
      type: 'cbublock',
      fields: {
        label: '详情信息',
        uiType: 'cbublock',
        promote: {
          right:
            '<em>详情图片文案避免字体侵权</em><a href=\'/page/redirect.html?name=marketDetailDescNorm\' target=\'_blank\'>查看规范</a>'
        }
      },
      position: 'body'
    },
    lightBeginAmount: {
      id: 'lightBeginAmount',
      tag: 'lightBeginAmount',
      type: 'cbunumber',
      fields: {
        uiType: 'cbunumber',
        label: '定制起定量',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'small',
        promote: {
          right: '定制发货时间请在“服务与承诺”-“发货服务”中和现货一同设置'
        },
        asyncCheck: false
      },
      position: 'body'
    },
    productDocument: {
      id: 'productDocument',
      tag: 'productDocument',
      type: 'cbu_product_doc',
      fields: {
        uiType: 'cbu_product_doc',
        label: '产品文档',
        required: false,
        readonly: false,
        visible: false,
        size: 'medium',
        asyncCheck: false
      },
      position: 'body'
    },
    blockProps: {
      id: 'blockProps',
      tag: 'blockProps',
      type: 'cbublock',
      fields: {
        label: '基础信息',
        uiType: 'cbublock'
      },
      position: 'body'
    },
    primaryPicture: {
      id: 'primaryPicture',
      tag: 'primaryPicture',
      type: 'cbu_picture',
      fields: {
        uiType: 'cbu_picture',
        label: '商品主图',
        info: {},
        required: true,
        size: 'medium',
        promote: {
          top: '建议您上传 750*750 像素以上的实拍大图，包含商品整体款式和商品细节 <em>最后一张发白底图可增加商品曝光机会，图片文案避免字体侵权</em> <a target="_blank" href="/page/redirect.html?name=primaryPictureNorm">查看规范</a>'
        },
        asyncCheck: false,
        showWlImage: false,
        recommendWl: false,
        maxItems: 5
      },
      position: 'body'
    },
    blockExtras: {
      id: 'blockExtras',
      tag: 'blockExtras',
      type: 'cbublock',
      fields: {
        label: '服务与承诺',
        uiType: 'cbublock'
      },
      position: 'body'
    },
    deliveryTime: {
      id: 'deliveryTime',
      tag: 'deliveryTime',
      type: 'cbuselect',
      fields: {
        uiType: 'cbuselect',
        label: '发货时间',
        info: {},
        rules: [
          {
            condition: '${buyerProtection.hasProtect}',
            target: {
              visible: false,
              required: false
            }
          },
          {
            condition: '!${buyerProtection.hasProtect}',
            target: {
              visible: true,
              required: true
            }
          }
        ],
        required: false,
        readonly: false,
        size: 'small',
        promote: {
          right:
            '<span class="warn">现货类商品必须填写发货时间，如有买保发货服务的以买保为准</span>'
        },
        asyncCheck: false,
        dataSource: [
          {
            value: '3',
            text: '三天发货'
          },
          {
            value: '5',
            text: '五天发货'
          },
          {
            value: '7',
            text: '七天发货'
          },
          {
            value: '10',
            text: '十天发货'
          },
          {
            value: '15',
            text: '十五天发货'
          }
        ]
      },
      position: 'body'
    },
    submit: {
      id: 'submit',
      tag: 'submit',
      type: 'cbubutton',
      fields: {
        uiType: 'cbubutton',
        info: {},
        asyncCheck: false,
        disabled: false,
        size: 'large',
        text: '同意协议条款，我要发布',
        url: 'submit.htm'
      },
      position: 'body'
    },
    cbuUnit: {
      id: 'cbuUnit',
      tag: 'cbuUnit',
      type: 'cbu_unit',
      fields: {
        uiType: 'cbu_unit',
        label: '计量单位',
        info: {},
        required: true,
        readonly: false,
        visible: true,
        size: 'small',
        asyncCheck: false,
        unitOptions: ['套', '个', '副', '件', '吨'],
        standardUnitRates: [
          {
            件: 0.0
          },
          {
            套: 0.0
          },
          {
            吨: 0.0
          },
          {
            个: 0.0
          },
          {
            副: 0.0
          }
        ],
        value: {
          unit: '套'
        }
      },
      position: 'body'
    },
    freight: {
      id: 'freight',
      tag: 'freight',
      type: 'cbu_freight',
      fields: {
        uiType: 'cbu_freight',
        label: '运费',
        info: {},
        required: true,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        value: {
          freightType: 'T',
          freightId: null,
          canQuitTime: 0,
          joinDate: null
        },
        dataSource: ['T', 'C', 'F']
      },
      position: 'body'
    },
    privacy: {
      id: 'privacy',
      tag: 'privacy',
      type: 'cbucheckbox',
      fields: {
        uiType: 'cbucheckbox',
        label: '私密商品',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'medium',
        asyncCheck: false,
        dataSource: [
          {
            value: 18626,
            text: '图片私密'
          },
          {
            value: 18690,
            text: '价格私密'
          }
        ],
        maxItems: 5,
        multiple: true
      },
      position: 'body'
    },
    description: {
      id: 'description',
      tag: 'description',
      type: 'cbu_description',
      fields: {
        uiType: 'cbu_description',
        label: '详情描述',
        info: {},
        required: true,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        value: {
          detailList: [
            {
              id: '0',
              title: '图文详情',
              contentUrl: null,
              isRequired: true
            }
          ],
          smartDetail: {},
          smartDesignInfo: {}
        }
      },
      position: 'body'
    },
    officialLogistics: {
      id: 'officialLogistics',
      tag: 'officialLogistics',
      type: 'cbu_official_logistics',
      fields: {
        uiType: 'cbu_official_logistics',
        label: '按规格设置重量',
        required: false,
        readonly: false,
        visible: true,
        size: 'medium',
        promote: {
          top: '不同规格可以设置不同的体积重量，运费模板将基于每个规格对应的体积重量来计算运费'
        },
        asyncCheck: false,
        isOfficialLogisticsMember: true,
        isOfficialLogisticsCategory: true,
        value: {}
      },
      position: 'body'
    },
    navStruct: {
      id: 'navStruct',
      tag: 'navStruct',
      type: 'cbu_nav_struct',
      fields: {
        uiType: 'cbu_nav_struct',
        label: '@',
        info: {},
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false
      },
      position: 'body'
    },
    title: {
      id: 'title',
      tag: 'title',
      type: 'cbu_title',
      fields: {
        uiType: 'cbu_title',
        label: '商品标题',
        info: {},
        required: true,
        readonly: false,
        visible: true,
        size: 'large',
        promote: {
          right:
            '<a href="/page/redirect.html?name=titleSuggestion">填写建议</a>'
        },
        asyncCheck: true,
        showCounter: true,
        placeholder:
          '建议使用通俗的产品名称，突出商品特性、卖点和优惠，请勿使用“最、第一”等违规词汇。',
        maxLength: 60
      },
      position: 'body'
    },
    catProp: {
      id: 'catProp',
      tag: 'catProp',
      type: 'cbu_cat_prop',
      fields: {
        uiType: 'cbu_cat_prop',
        label: '类目属性',
        info: {},
        required: true,
        promote: {
          top: '类目属性描述错误或不完整，可能会导致商品审核不通过，或搜索流量减少，请准确完整填写'
        },
        asyncCheck: false,
        customizable: true,
        maxCustomItems: 3,
        dataSource: [
          {
            name: 'p-100000729',
            uiType: 'select',
            label: '加工定制',
            required: true,
            promote: {},
            asyncCheck: false,
            propertyId: 100000729,
            fieldType: 'enum',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50,
            dataSource: [
              {
                value: 21958,
                text: '是'
              },
              {
                value: 21959,
                text: '否'
              }
            ]
          },
          {
            name: 'p-287',
            uiType: 'select',
            label: '材质',
            required: true,
            promote: {},
            asyncCheck: false,
            propertyId: 287,
            fieldType: 'enum',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            customizable: true,
            maxLength: 50,
            dataSource: [
              {
                value: 25423961,
                text: '半金属'
              },
              {
                value: 223118283,
                text: '少金属'
              },
              {
                value: 35108481,
                text: '石棉'
              },
              {
                value: 122157256,
                text: '无石棉'
              },
              {
                value: 42749,
                text: '陶瓷'
              }
            ]
          },
          {
            name: 'p-2553',
            uiType: 'input',
            label: '适用车型',
            required: true,
            promote: {},
            asyncCheck: false,
            propertyId: 2553,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-3567',
            uiType: 'select',
            label: '种类',
            async: {
              childPropUrl:
                '/general/simpleAsyncRender.htm?optType=cbuRender&catId=1032176'
            },
            required: true,
            promote: {},
            asyncCheck: false,
            propertyId: 3567,
            fieldType: 'enum',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50,
            supportLevelProp: true,
            dataSource: [
              {
                value: 7188941,
                text: '刹车盘'
              },
              {
                value: 47673,
                text: '刹车片'
              },
              {
                value: 1403191011,
                text: '其他配件类'
              }
            ]
          },
          {
            name: 'p-6720',
            uiType: 'input',
            label: '衬片硬度',
            required: false,
            unit: 'kn/c㎡',
            promote: {},
            asyncCheck: false,
            propertyId: 6720,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-2176',
            uiType: 'input',
            label: '品牌',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 2176,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-3151',
            uiType: 'input',
            label: '型号',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 3151,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-346',
            uiType: 'input',
            label: '产地',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 346,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-9573',
            uiType: 'input',
            label: '配件编号',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 9573,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-1398',
            uiType: 'input',
            label: '货号',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 1398,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-151466146',
            uiType: 'input',
            label: '适用汽车品牌',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 151466146,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-157878556',
            uiType: 'input',
            label: '适用车型年份',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 157878556,
            fieldType: 'string',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50
          },
          {
            name: 'p-180024170',
            uiType: 'select',
            label: '适用车型变速箱类型',
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 180024170,
            fieldType: 'enum',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50,
            dataSource: [
              {
                value: 1597164781,
                text: 'MT/手动档'
              },
              {
                value: 1597202216,
                text: 'AT/自动挡'
              }
            ]
          },
          {
            name: 'p-182282223',
            uiType: 'select',
            label: '是否跨境出口专供货源',
            async: {
              childPropUrl:
                '/general/simpleAsyncRender.htm?optType=cbuRender&catId=1032176'
            },
            required: false,
            promote: {},
            asyncCheck: false,
            propertyId: 182282223,
            fieldType: 'enum',
            propType: 'item',
            maxItems: 200,
            maxCustomItems: 1,
            maxLength: 50,
            supportLevelProp: true,
            dataSource: [
              {
                value: 21958,
                text: '是'
              },
              {
                value: 21959,
                text: '否'
              }
            ]
          }
        ],
        value: {
          custom: [],
          spuId: null
        }
      },
      position: 'body'
    },
    bPrice: {
      id: 'bPrice',
      tag: 'bPrice',
      type: 'cbu_bprice',
      fields: {
        uiType: 'cbu_bprice',
        label: 'L会员价设置',
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        bpriceMode: 2,
        canQuit: true
      },
      position: 'body'
    },
    userCategory: {
      id: 'userCategory',
      tag: 'userCategory',
      type: 'cbuselecttree',
      fields: {
        uiType: 'cbuselecttree',
        label: '自定义分类',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'small',
        promote: {
          right:
            '<a target="_blank" href="https://apps.1688.com/page/userdefcatmanager.htm">管理自定义分类</a>'
        },
        asyncCheck: false,
        dataSource: [
          {
            value: '155520370',
            text: '刹车感应线'
          },
          {
            value: '155130355',
            text: '传动轴机脚胶'
          },
          {
            value: '152450757',
            text: '控制臂'
          },
          {
            value: '152550850',
            text: '刹车片'
          },
          {
            value: '157486239',
            text: '衬套'
          },
          {
            value: '156181793',
            text: '刹车盘'
          },
          {
            value: '158886832',
            text: '其它'
          },
          {
            value: '173746127',
            text: '空气滤清器'
          }
        ],
        multiple: true
      },
      position: 'body'
    },
    supplyType: {
      id: 'supplyType',
      tag: 'supplyType',
      type: 'cbu_supply_type',
      fields: {
        uiType: 'cbu_supply_type',
        label: '供货方式',
        info: {},
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        dataSource: [
          {
            value: 1,
            text: '现货',
            help: '库存充足商品（现货商品享更多流量）'
          },
          {
            value: 2,
            text: '定制',
            help: '支持现款订货、属性定制、特色服务，可根据实际数量设置多档交期'
          }
        ]
      },
      position: 'body'
    },
    blockTrading: {
      id: 'blockTrading',
      tag: 'blockTrading',
      type: 'cbublock',
      fields: {
        uiType: 'cbublock',
        label: '产品销售信息',
        info: {},
        promote: {
          right:
            '设置一件起批可能导致零售买家下单，为避免不必要的纠纷，请慎重操作。'
        },
        asyncCheck: false
      },
      position: 'body'
    },
    orderProduct: {
      id: 'orderProduct',
      tag: 'orderProduct',
      type: 'cbu_order_product',
      fields: {
        uiType: 'cbu_order_product',
        label: '订货范围',
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false,
        isLightServiceOffer: false
      },
      position: 'body'
    },
    mixBatch: {
      id: 'mixBatch',
      tag: 'mixBatch',
      type: 'cbucheckbox',
      fields: {
        uiType: 'cbucheckbox',
        label: '混批',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'medium',
        promote: {
          right:
            '<a target="_blank" href="https://marketing.1688.com/marketing/mixWholesaleSet.htm?flag=offerFlag&functionName=updateMixBatchSettings">混批规则详情</a>'
        },
        asyncCheck: false,
        dataSource: [
          {
            value: 17026,
            text: '支持混批'
          }
        ],
        maxItems: 5,
        multiple: true
      },
      position: 'body'
    },
    onlineTrade: {
      id: 'onlineTrade',
      tag: 'onlineTrade',
      type: 'cburadio',
      fields: {
        uiType: 'cburadio',
        label: '网上订购',
        info: {},
        required: true,
        readonly: false,
        visible: true,
        size: 'medium',
        asyncCheck: false,
        dataSource: [
          {
            value: 17410,
            text: '支持',
            help: '您支持的收款方式有：支付宝担保交易收款；'
          },
          {
            value: -1,
            text: '不支持',
            help: '买家更信任支持网上订购的卖家，建议根据产品实际情况，选择支持在线订购！'
          }
        ]
      },
      position: 'body'
    },
    detailVideo: {
      id: 'detailVideo',
      tag: 'detailVideo',
      type: 'cbu_primary_video',
      fields: {
        uiType: 'cbu_primary_video',
        label: '详情视频',
        info: {},
        required: false,
        readonly: false,
        asyncCheck: false,
        showType: 'button'
      },
      position: 'body'
    },
    globalMessage: {
      id: 'globalMessage',
      tag: 'globalMessage',
      type: 'cbu_message',
      fields: {
        uiType: 'cbu_message',
        label: '错误提示',
        info: {},
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false
      },
      position: 'body'
    },
    batchScale: {
      id: 'batchScale',
      tag: 'batchScale',
      type: 'cbuinput',
      fields: {
        uiType: 'cbuinput',
        label: '一手等于',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'medium',
        asyncCheck: false,
        showCounter: true
      },
      position: 'body'
    },
    skuTable: {
      id: 'skuTable',
      tag: 'skuTable',
      type: 'cbu_sku_table',
      fields: {
        uiType: 'cbu_sku_table',
        label: '规格报价',
        info: {},
        readonly: false,
        isZebra: true,
        promote: {
          top: '您的商品命中零售热卖商机，建议您定价为：52.95-132.39'
        },
        column: [
          {
            name: 'sku_specId',
            uiType: 'cbuinput',
            label: 'specId',
            info: {},
            required: false,
            readonly: true,
            visible: false,
            size: 'medium',
            asyncCheck: false,
            showCounter: true
          },
          {
            name: 'sku_skuId',
            uiType: 'cbunumber',
            label: 'sku_skuId',
            info: {},
            required: false,
            readonly: true,
            visible: false,
            size: 'medium',
            asyncCheck: false,
            precision: 0
          },
          {
            name: 'sku_props',
            uiType: 'cbu_universal',
            label: '规格属性',
            info: {},
            required: false,
            readonly: true,
            size: 'medium',
            asyncCheck: false
          },
          {
            name: 'sku_picture_url',
            uiType: 'cbu_universal',
            label: '规格图片',
            info: {},
            required: false,
            readonly: true,
            visible: true,
            size: 'medium',
            asyncCheck: false
          },
          {
            name: 'sku_price',
            uiType: 'cbunumber',
            label: 'L0-L1拿货价',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 2
          },
          {
            name: 'sku_firstPrice',
            uiType: 'cbunumber',
            label: 'L2-L4会员价',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 2
          },
          {
            name: 'sku_secondPrice',
            uiType: 'cbunumber',
            label: 'L5-L6会员价',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 2
          },
          {
            name: 'sku_amountOnSale',
            uiType: 'cbunumber',
            label: '可售数量',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 0
          },
          {
            name: 'sku_amountOrder',
            uiType: 'cbunumber',
            label: '累计订购数量',
            info: {},
            required: false,
            readonly: true,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 0
          },
          {
            name: 'sku_cargoNumber',
            uiType: 'cbuinput',
            label: '单品货号',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            showCounter: true
          },
          {
            name: 'sku_status',
            uiType: 'cbu_universal',
            label: '是否上架',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false
          }
        ],
        value: [],
        dataInfo: [],
        itemTips: {}
      },
      position: 'body'
    },
    totalSales: {
      id: 'totalSales',
      tag: 'totalSales',
      type: 'cbunumber',
      fields: {
        uiType: 'cbunumber',
        label: '可售总量',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        size: 'small',
        asyncCheck: false,
        precision: 0
      },
      position: 'body'
    },
    standardPrice: {
      id: 'standardPrice',
      tag: 'standardPrice',
      type: 'cbutext',
      fields: {
        uiType: 'cbutext',
        label: '价格',
        info: {},
        required: false,
        readonly: true,
        visible: false,
        unit: '元',
        asyncCheck: false,
        dataSource: [
          {
            value: 0
          }
        ],
        maxItems: 5,
        multiple: true
      },
      position: 'body'
    },
    blockPrimary: {
      id: 'blockPrimary',
      tag: 'blockPrimary',
      type: 'cbublock',
      fields: {
        label: '主图视频',
        uiType: 'cbublock'
      },
      position: 'body'
    },
    relationOffer: {
      id: 'relationOffer',
      tag: 'relationOffer',
      type: 'cbu_relation_offer',
      fields: {
        uiType: 'cbu_relation_offer',
        label: '关联定制产品',
        required: false,
        readonly: false,
        size: 'medium',
        promote: {
          top: '可以为现货产品关联1个加工定制产品，方便买家了解加工定制信息、下定制订单， 也可在访问加工定制产品时采购现货样品'
        },
        asyncCheck: false,
        maxItems: 1
      },
      position: 'body'
    },
    buyerProtection: {
      id: 'buyerProtection',
      tag: 'buyerProtection',
      type: 'cbubuyerprotection',
      fields: {
        uiType: 'cbubuyerprotection',
        label: '买家保障',
        info: {},
        required: false,
        readonly: false,
        visible: true,
        asyncCheck: false,
        hasProtect: true,
        stockOffer: true,
        processOffer: false,
        powerMerchant: false,
        categoryId: 1032176
      },
      position: 'body'
    },
    plugin: {
      id: 'plugin',
      tag: 'plugin',
      type: 'cbu_plugin',
      fields: {
        uiType: 'cbu_plugin',
        label: '场景插件',
        info: {},
        required: false,
        readonly: false,
        size: 'medium',
        asyncCheck: false
      },
      position: 'body'
    },
    priceRange: {
      id: 'priceRange',
      tag: 'priceRange',
      type: 'cbu_interval_table',
      fields: {
        uiType: 'cbu_interval_table',
        label: '区间报价',
        info: {},
        required: false,
        readonly: false,
        isZebra: true,
        promote: {},
        column: [
          {
            name: 'pricerange_operation',
            uiType: 'cbuinput',
            label: '操作',
            info: {},
            required: false,
            readonly: true,
            visible: false,
            size: 'medium',
            asyncCheck: false,
            showCounter: true
          },
          {
            name: 'pricerange_beginAmount',
            uiType: 'cbunumber',
            label: '购买数量',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 0
          },
          {
            name: 'pricerange_price',
            uiType: 'cbunumber',
            label: 'L0-L1拿货价',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 2
          },
          {
            name: 'pricerange_firstPrice',
            uiType: 'cbunumber',
            label: 'L2-L4会员价',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 2
          },
          {
            name: 'pricerange_secondPrice',
            uiType: 'cbunumber',
            label: 'L5-L6会员价',
            info: {},
            required: false,
            readonly: false,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            precision: 2
          },
          {
            name: 'pricerange_preview',
            uiType: 'cbuinput',
            label: '预览（可根据买家采购的不同数量设置不同价格）',
            info: {},
            required: false,
            readonly: true,
            visible: true,
            size: 'medium',
            asyncCheck: false,
            showCounter: true
          }
        ],
        value: [],
        dataInfo: [],
        itemTips: {}
      },
      position: 'body'
    }
  },
  hierarchy: {
    root: 'cbulayout_35496',
    structure: {
      blockTradeInfo: [
        'saleProp',
        'onlineTrade',
        'cbuUnit',
        'quotationType',
        'bPrice',
        'priceRange',
        'skuTable',
        'invReduce',
        'totalSales',
        'beginAmount',
        'standardPrice',
        'lightCustom',
        'lightService',
        'lightBeginAmount',
        'processPriceTpl',
        'anXinGouService',
        'batchSale',
        'mixBatch',
        'upshelfTime',
        'relationOffer'
      ],
      blockExtras: [
        'tradeTemplate',
        'privacy',
        'buyerProtection',
        'deliveryTime',
        'seven_day',
        'industryService',
        'takeSample',
        'commodityCustomization',
        'warrantyService',
        'onsiteService'
      ],
      blockLogistics: [
        'cbuSendAddress',
        'freight',
        'officialLogistics',
        'weight',
        'suttleWeight',
        'volume'
      ],
      blockDescription: ['description', 'detailVideo', 'userCategory'],
      blockProps: ['title', 'catProp', 'importProp', 'productDocument'],
      blockPrimary: ['primaryPicture', 'primaryVideo', 'industrySelectVideo'],
      cbulayout_35496: [
        'globalMessage',
        'navStruct',
        'supplyType',
        'catNamer',
        'blockPrimary',
        'blockProps',
        'blockTradeInfo',
        'blockExtras',
        'blockLogistics',
        'blockDescription',
        'submit',
        'plugin',
        'assistBoard'
      ]
    }
  },
  global: {
    renderData: {
      appType: 'isv'
    },
    name: 'icmp_global',
    systemParam: {
      catId: 1032176,
      icmpPageName: 'render',
      edit: false,
      isItemEdit: false,
      contextPath: '/general',
      catNames: '汽摩及配件>制动系统>刹车片',
      catIds: '71>10106>1032176'
    }
  },
  endpoint: {
    mode: 'pc',
    osVersion: '9.9.9',
    protocolVersion: '3.0',
    ultronage: true,
    standard: true
  },
  reload: false
}
export const productAddParams = {
  catId: 1031910,
  scene: 'popular',
  dataBody: {
    formValues: {
      batchSale: {
        enable: true,
        sellUnit: '手',
        scale: '2'
      },
      beginAmount: 2,
      upshelfTime: {
        value: 1,
        subText: '商品已经开售'
      },
      quotationType: {
        value: 2
      },
      cbuSendAddress: {
        value: 33847521
      },
      seven_day: [
        {
          value: 32450,
          text: '支持7天无理由退货'
        }
      ],
      invReduce: {
        value: '1',
        text: '下单时扣减'
      },
      weight: 0.5,
      catNamer: {
        chooseCategoryUrl:
          'https: //offer.1688.com/offer/post/choose_category.htm',
        pathList: [
          {
            categoryId: 10166,
            name: '女装'
          },
          {
            categoryId: 1031910,
            name: '连衣裙'
          }
        ]
      },
      saleProp: {
        'p-3216': [
          {
            value: -1,
            text: '黑色',
            imgUrl: 'img/ibank/O1CN01e4HFIU21NE3TMhvrK_!!2110816972-0-cib.jpg',
            custom: true
          }
        ],
        'p-450': [
          {
            value: 28314,
            text: 'S'
          },
          {
            value: -2,
            text: '测试尺寸',
            custom: true
          }
        ],
        custom: []
      },
      primaryPicture: {
        imageList: [
          {
            url: 'img/ibank/O1CN01wQA8R121NE3Z7CCrK_!!2110816972-0-cib.jpg'
          },
          {
            url: 'img/ibank/O1CN01EQ8awI21NE3SM8ECx_!!2110816972-0-cib.jpg'
          },
          {
            url: 'img/ibank/O1CN01yV8DlF21NE3TMcUrz_!!2110816972-0-cib.jpg'
          },
          {
            url: 'img/ibank/O1CN012cJJtF21NE3T6PxQd_!!2110816972-0-cib.jpg'
          },
          {
            url: 'img/ibank/O1CN01NMpAlw21NE3J9Mbbf_!!2110816972-0-cib.jpg'
          }
        ]
      },
      cbuUnit: {
        unit: '件'
      },
      freight: {
        freightType: 'T',
        freightId: 13900148
      },
      description: {
        detailList: [
          {
            id: '0',
            title: '图文详情',
            contentUrl: null,
            content: '<p>1111122224444</p>',
            isRequired: true
          }
        ]
      },
      title: '2110307-胸前挂白色珠子链连衣裙-注: 断码不退换23500',
      catProp: {
        'p-221796513': {
          value: 21959,
          text: '否'
        },
        'p-20666': {
          value: 1957142166,
          text: '2023年春季'
        },
        'p-100031521': {
          value: 105255,
          text: '棉'
        },
        'p-100031521-117130178': {
          value: 105255,
          text: '棉'
        },
        'p-100031521-117130178-149092418': {
          value: 20954747149,
          text: '90%（不含）-95%（含）'
        },
        'p-100031521-151844178': {
          value: 105255,
          text: '棉'
        },
        'p-100031521-151844178-153610427': {
          value: 145656296,
          text: '30%及以下'
        },
        'p-2489638': {
          value: 91043051,
          text: '气质通勤'
        },
        'p-2489638-401': {
          value: 90364718,
          text: '通勤风'
        },
        'p-20602': {
          value: 29538,
          text: '方领'
        },
        'p-2917380': {
          value: 27924515,
          text: '常规袖'
        },
        'p-7001': {
          value: 29445,
          text: '短袖'
        },
        'p-20680': {
          value: 29962,
          text: '中裙'
        },
        'p-34321': {
          value: 130318,
          text: 'A字裙'
        },
        'p-1811': {
          value: 3289490,
          text: '基本款'
        },
        'p-1085': {
          value: 148617201,
          text: '拼贴/拼接'
        },
        'p-8614': {
          value: '5133509',
          text: '勾花'
        },
        'p-2576403': {
          value: 3386071,
          text: '单件'
        },
        'p-20677': {
          value: 29952,
          text: '高腰'
        },
        'p-100000709': {
          value: 112631,
          text: '一粒扣'
        },
        'p-2900': {
          value: '29455',
          text: '手绘'
        },
        'p-2176': {
          value: '265650483',
          text: '尹沐'
        },
        'p-346': '深圳',
        'p-1398': '2110307',
        custom: [
          {
            text: 'aaa',
            propName: '测试'
          }
        ]
      },
      userCategory: [
        {
          value: '119793375',
          text: '女装'
        },
        {
          value: '120273982',
          text: '测试类目'
        }
      ],
      mixBatch: [
        {
          value: 17026,
          text: '17026'
        }
      ],
      onlineTrade: {
        value: 17410
      },
      skuTable: [
        {
          sku_props: [
            {
              id: 3216,
              name: 'p-3216',
              label: '颜色',
              value: -1,
              text: '黑色'
            },
            {
              id: 450,
              name: 'p-450',
              label: '尺码',
              value: 28314,
              text: 'S'
            }
          ],
          sku_amountOnSale: 100,
          sku_cargoNumber: '2110307-18-M',
          sku_status: 1
        },
        {
          sku_props: [
            {
              id: 3216,
              name: 'p-3216',
              label: '颜色',
              value: -1,
              text: '黑色'
            },
            {
              id: 450,
              name: 'p-450',
              label: '尺码',
              value: -2,
              text: '测试尺寸'
            }
          ],
          sku_amountOnSale: 100,
          sku_status: 1
        }
      ],
      totalSales: 200,
      buyerProtection: {
        spsCode: ['qsexsfh']
      },
      lightCustom: {
        text: '不支持',
        value: -9999
      },
      priceRange: [
        {
          pricerange_beginAmount: 2,
          pricerange_price: 22
        },
        {
          pricerange_beginAmount: 5,
          pricerange_price: 21
        }
      ],
      suttleWeight: 0.5,
      volume: {
        height: 20,
        width: 15,
        length: 10
      },
      officialLogistics: {
        skuInfo: [
          {
            length: 10,
            width: 15,
            height: 20,
            weight: 200,
            volume: 3000,
            sku_props: [
              {
                id: 3216,
                name: 'p-3216',
                value: -1
              },
              {
                id: 450,
                name: 'p-450',
                value: -2
              }
            ]
          },
          {
            length: 10,
            width: 15,
            height: 20,
            weight: 200,
            volume: 3000,
            sku_props: [
              {
                id: 3216,
                name: 'p-3216',
                value: -1
              },
              {
                id: 450,
                name: 'p-450',
                value: 28314
              }
            ]
          }
        ]
      },
      global: {
        systemParam: {
          catId: 1031910,
          contextPath: '/popular'
        }
      }
    }
  }
}
