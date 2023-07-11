import sys
from PIL import Image
water = 'F:\git-hub\python\透明水印.png'
logo = 'F:\git-hub\python\logo_sm.png'


def standard(index_path, save_path, image_id):
    water_img = Image.open(water)
    index_img = Image.open(index_path)

    canvas_img = index_img.resize((1000, 1000))

    # 创建新图层
    layer = Image.new("RGBA", (1000, 1000), (0, 0, 0, 0))
    logo_img = Image.open(logo)
    layer.paste(logo_img, (50, 50))
    if water_img.mode != "RGBA":
        water_img = water_img.convert("RGBA")
    width1, height1 = canvas_img.size
    width2, height2 = water_img.size
    width = (width1-width2)/2
    height = (height1-height2)/2
    layer.paste(water_img, (int(width), int(height)))

    im = Image.composite(layer, canvas_img, layer)
    im.save(save_path+'\\'+image_id+'_1000X1000.jpg')

    im300 = im.resize((300, 300))
    im300.save(save_path+'\\'+image_id+'_300X300.jpg')

    im50 = im.resize((50, 50))
    im50.save(save_path+'\\'+image_id+'_50X50.jpg')
    print({'msg': 'ok'})


if __name__ == '__main__':
    index = sys.argv[1]
    save_path = sys.argv[2]
    image_id = sys.argv[3]
    standard(index, save_path, image_id)
