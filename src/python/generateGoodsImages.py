from PIL import Image, ImageDraw, ImageFont
from rembg import remove
import requests
from io import BytesIO
import sys
import os


def imagesCover(cover_path, part_path, oe, save_path):
    part_img = Image.open(part_path).resize((1000, 1000)).convert('RGBA')
    cover_img = Image.open(cover_path).convert('RGBA')
    final = Image.new('RGBA', (1000, 1000))
    final = Image.alpha_composite(final, part_img)
    final = Image.alpha_composite(final, cover_img)

    final = final.convert('RGB')
    final.save(save_path)
# 创建一个可编辑的图像副本
    new_image = final.copy()
# 创建 ImageDraw 对象
    draw = ImageDraw.Draw(new_image)
    # 添加文字图层
    text_layer1 = "OE: "+oe
    text_position1 = (310, 890)  # 文字位置，以左上角为基准点 92,92
    font = ImageFont.truetype('C:\\Windows\\Fonts\\Arial.ttf', 60)
    draw.text(text_position1, text_layer1, font=font, fill=(256, 256, 256))
    new_image.save(save_path)


def detailCover(cover_path, part_path, save_path):
    part_img = Image.open(part_path).resize((750, 750))
    cover_img = Image.open(cover_path).resize((1000, 1000))
    final = Image.new('RGBA', (1000, 1000))
    final.paste(cover_img)
    final.paste(part_img, (125, 80))
    final = final.convert('RGB')
    final.save(save_path)


def packageCover(box_img_path, part_path, save_path):
    # 打开原始图层
    box = Image.open(box_img_path)
    box_resized = box.resize((1000, 1000)).convert('RGBA')
    part = Image.open(part_path)
    height = 400
    width = part.size[0]*height/part.size[1]
    part_resized = part.resize((int(width), height)).convert('RGBA')

    # 获取图片某一点颜色
    color = part.getpixel((2, 2))
    color = (255, 255, 255)
    # 创建新图像并合并图层
    new_image = Image.new('RGBA', (1000, 1000), color)
    top = 520
    left = (1000-width)/2
    new_image.paste(part_resized, (int(left), top), part_resized)
    new_image.paste(box_resized, (0, 0), box_resized)
    # 保存合并后的图像
    new_image.save(save_path)
    os.remove(part_path)


def rembg(inputFileType, inputFile, outputFile):
    if inputFileType == 'http':
        # 发送GET请求并获取图片数据
        response = requests.get(inputFile)
        # 将图片数据读取为字节流
        image_data = BytesIO(response.content)
        image = Image.open(image_data)
    else:
        image = Image.open(inputFile)
    if image.mode == 'RGBA':
        image = image.convert("RGB")
    output = remove(image)
    output.save(outputFile, 'png')
    os.remove(inputFile)
    pass


if __name__ == '__main__':
    coverPath = sys.argv[1]
    coverPart = sys.argv[2]
    coverCode = sys.argv[3]
    coverSavePath = sys.argv[4]
    opt = sys.argv[5]
    productId = sys.argv[6]
    isRmbg = sys.argv[7]
    rembgPath = sys.argv[8]
    # params =  ["F:/wrokspace/vue/leo-fly-admin/src/python/generateGoodsImages.py","G:/image/0/package-box.png","C:/Users/admin/Downloads/leo-image-package.jpg","LR160435","G:/image/4519/4519-package.png","package","4519","1","G:/image/4519/temp.png"]
    # coverPath = params[1]
    # coverPart = params[2]
    # coverCode = params[3]
    # coverSavePath = params[4]
    # opt = params[5]
    # productId = params[6]
    # isRmbg = params[7]
    # rembgPath = params[8]
    try:
        if opt == 'alibaba':
            imagesCover(coverPath, coverPart,
                        coverCode, coverSavePath)
        elif opt == '1688detail':
            detailCover(coverPath, coverPart, coverSavePath)
        elif opt == 'package':
            if isRmbg == '1':
                rembg('null', coverPart, rembgPath)
                packageCover(coverPath, rembgPath, coverSavePath)
            else:
                packageCover(coverPath, coverPart, coverSavePath)
    except Exception as e:
        print({'code': 'fail', 'msg': e})
    else:
        print({'code': 'ok', 'msg': coverSavePath})
