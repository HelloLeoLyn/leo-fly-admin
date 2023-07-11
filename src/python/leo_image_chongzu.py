import sys
from PIL import Image
import os
import time
water = 'F:\git-hub\python\透明水印.png'
logo = 'F:\git-hub\python\logo_sm.png'


def whiteBG(img):
    i = 1
    j = 1
    width = img.size[0]  # 长度
    height = img.size[1]  # 宽度
    for i in range(0, width):  # 遍历所有长度的点
        for j in range(0, height):  # 遍历所有宽度的点
            data = (img.getpixel((i, j)))  # 打印该图片的所有点
            # print(data)  # 打印每个像素点的颜色RGBA的值(r,g,b,alpha)
            # print(data[0])  # 打印RGBA的r值
            # RGBA的r值大于170，并且g值大于170,并且b值大于170
            if data[0] >= 150 and data[1] >= 160 and data[2] >= 0:
                # 则这些像素点的颜色改成大红色
                img.putpixel((i, j), (255, 255, 255, 255))
    img = img.convert("RGB")  # 把图片强制转成RGB
    # img.save(target_path + "/" + str(count) + ".jpg")  # 保存修改像素点后的图片
    return img


def chongzu(index_path, save_path, image_id, size300, size50, fillWhiteBG, file_type, left_logo, bg_water, opt_type):

    index_img = Image.open(index_path)

    if os.path.exists(index_path) == False:
        time.sleep(1)

    w, h = 1000, 1000
    if opt_type == 'cutting':
        w, h = index_img.size
        if w > h:
            if w >= 800:
                h = (800*h)/w
                w = 800
        else:
            if h >= 800:
                w = (800*w)/h
                h = 800
    target_img = index_img.resize((int(w), int(h)))

    if fillWhiteBG == '1':
        target_img = whiteBG(target_img)

    point = [int((1000-w)/2), int((1000-h)/2)]
    canvas_img = Image.new('RGB', (1000, 1000), '#ffffff')
    canvas_img.paste(target_img, point)
    canvas_img.save(save_path+'\\'+image_id+file_type)

    # 创建新图层
    layer = Image.new("RGBA", (1000, 1000), (0, 0, 0, 0))

    if left_logo == '1':
        logo_img = Image.open(logo)
        layer.paste(logo_img, (50, 50))

    if bg_water == '1':
        water_img = Image.open(water)
        if water_img.mode != "RGBA":
            water_img = water_img.convert("RGBA")
        width1, height1 = canvas_img.size
        width2, height2 = water_img.size
        width = (width1-width2)/2
        height = (height1-height2)/2
        layer.paste(water_img, (int(width), int(height)))

    im = Image.composite(layer, canvas_img, layer)
    im.save(save_path+'\\'+image_id+'_1000X1000'+file_type)

    if size300 == '1':
        im300 = im.resize((300, 300))
        im300.save(save_path+'\\'+image_id+'_300X300'+file_type)
    if size50 == '1':
        im50 = im.resize((50, 50))
        im50.save(save_path+'\\'+image_id+'_50X50'+file_type)

    os.remove(index_path)
    print({'msg': 'ok'})


if __name__ == '__main__':
    index = sys.argv[1]
    save_path = sys.argv[2]
    image_id = sys.argv[3]
    size300 = sys.argv[4]
    size50 = sys.argv[5]
    fillWhiteBG = sys.argv[6]
    file_type = sys.argv[7]
    left_logo = sys.argv[8]
    bg_water = sys.argv[9]
    opt_type = sys.argv[10]

    # args = ["python","E:\\workspace\\python\\AutoPS\\leo_image_chongzu.py","C:\\Users\\admin\\Downloads\\leo-image-chongzu.jpg","E:/image/1352","40831","1","1","0",".jpg","0","0","resize"]
    # index = args[1]
    # save_path = args[2]
    # image_id = args[3]
    # size300 = args[4]
    # size50 = args[5]
    # fillWhiteBG = args[6]
    # file_type = args[7]
    # left_logo = args[8]
    # bg_water = args[9]
    # opt_type = args[10]
    # index = 'C:/Users/admin/Downloads/leo-image-chongzu.jpg'
    # save_path = 'E:/image/16053'
    # image_id = '55555'
    # size300 = '1'
    # size50 = '1'
    # fillWhiteBG = 0
    # file_type = '.JPG'
    # left_logo = 0
    # bg_water = 0
    # opt_type = 'cutting'
    # image_id = '1'
    chongzu(index, save_path, image_id, size300, size50,
            fillWhiteBG, file_type, left_logo, bg_water, opt_type)
