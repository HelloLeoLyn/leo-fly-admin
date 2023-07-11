# -*- coding: utf-8 -*-
import cv2
import numpy
from PIL import Image, ImageDraw, ImageFont
img = cv2.imread('G:/1/02.jpg')
# 判断是否是openCV图片类型
if (isinstance(img, numpy.ndarray)):
    # 转化成PIL类型
    img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
draw = ImageDraw.Draw(img)
# 字体的格式
textSize = 280
fontStyle = ImageFont.truetype(
    "font/simsun.ttc", textSize, encoding="utf-8")
# 绘制文本
left = 100
top = 100
text = '@MDTZ'
textColor = (246, 37, 37)
draw.text((left, top), text, textColor, font=fontStyle)
# 转换回OpenCV类型
img2 = cv2.cvtColor(numpy.asarray(img), cv2.COLOR_RGB2BGR)
# 保存图片
cv2.imwrite('wj.jpg', img2)
cv2.imshow('img', img2)
cv2.waitKey(0)
cv2.destoryAllWindows('img')
