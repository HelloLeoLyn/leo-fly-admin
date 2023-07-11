import cv2
from PIL import Image


def calc_diff(pixel, bg_color):
    #     计算pixel与背景的离差平方和，作为当前像素点与背景相似程度的度量
    return (pixel[0] - bg_color[0]) ** 2 + (pixel[1] - bg_color[1]) ** 2 + (pixel[2] - bg_color[2]) ** 2


def remove_one_color_opencv():  # 采用opencv方式
    delete_color = [0, 0, 0]
    threshold = 13
    image_path = "example3.png"
    img1 = cv2.imread(image_path)
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2BGRA)  # 将图像转成带透明通道的BGRA格式
    for i in range(img1.shape[0]):
        for j in range(img1.shape[1]):
            if calc_diff(img1[i][j], delete_color) < threshold:
                img1[i][j] = (255, 255, 255, 0)
    cv2.imwrite("output2.png", img1)


# 采用pillow方式
def remove_one_color_pillow(delete_color, src_path, dest_path):
    threshold = 13
    img2 = Image.open(src_path)
    img2 = img2.convert('RGBA')
    pixdata = img2.load()
    for y in range(img2.size[1]):
        for x in range(img2.size[0]):
            if calc_diff(pixdata[x, y], delete_color) < threshold:
                pixdata[x, y] = (255, 255, 255, 0)
    img2.save(dest_path)


if __name__ == '__main__':
    filepath = 'heidilanziMDTZ.png_perspective.png'
    dest_path = 'remove_one_color_pillow'+filepath
    remove_one_color_pillow([0, 0, 0], filepath, dest_path)
    # remove_one_color_opencv()
