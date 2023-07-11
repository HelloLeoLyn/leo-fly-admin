# barcode模块能自动计算验证码
import barcode
code1 = barcode.generate('ean13', '2312123123132',
                         writer=barcode.writer.ImageWriter(),
                         output='barcode',
                         writer_options={
                             "background": "#9f9794", 'write_text': False,  'module_width': 0.2,
                             'module_height': 7.0,
                             'quiet_zone': 1.5,
                             'font_size': 10,
                             'text_distance': 5.0,
                             #  'foreground': 'black',
                             'text': ''},
                         text='')
# 简：写：
# code2 = barcode.generate('ean13','2312123123132',barcode.writer.ImageWriter(),'barcode_png2',{"background": "red"},text='weerwr')
