from PIL import Image
import os


def func(src_path: str, target_path: str):
    i = 1
    j = 1
    img_files = os.listdir(src_path)
    img_files.reverse()
    count = 0
    for file_name in img_files:
        img_path = os.path.join(src_path, file_name)
        img = Image.open(img_path)  # 读取系统的内照片
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
        img.save(target_path + "/" + str(count) + ".jpg")  # 保存修改像素点后的图片
        count += 1


if __name__ == '__main__':

    func('G:\\warning\\e-shop\\image\\2286', 'G:\\warning\\e-shop\\python')
