from PIL import Image
img = Image.open("G:/1/logo.png")  # 读取照片
img = img.convert("RGBA")    # 转换格式，确保像素包含alpha通道
width, height = img.size     # 长度和宽度
for i in range(0, width):     # 遍历所有长度的点
    for j in range(0, height):       # 遍历所有宽度的点
        data = img.getpixel((i, j))  # 获取一个像素
        if (data.count(255) == 4):  # RGBA都是255，改成透明色
            img.putpixel((i, j), (255, 255, 255, 0))
img.save("G:/1/transparent.png")  # 保存图片
