import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt


def imgShow(img):
    cv.imshow('img', img)
    cv.waitKey(0)
    cv.destroyAllWindows()


def show(img):
    if img.ndim == 2:
        plt.imshow(img, cmap='gray', vmin=0, vmax=255)
    else:
        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        plt.imshow(img)


def ModifySizeOfPicTo512(_PicLocation):
    im1 = cv.imread(_PicLocation)  # 素材的位置
    # 改变素材大小，代码中的512根据自己需求修改
    im2 = cv.resize(im1, (512, 512), interpolation=cv.INTER_CUBIC)
    cv.imwrite(_PicLocation, im2)  # 从新写入素材
    return _PicLocation  # 返回素材位置


def ModifySize(_PicLocation, w, h):
    im1 = cv.imread(_PicLocation)  # 素材的位置
    im2 = cv.resize(im1, (w, h), interpolation=cv.INTER_CUBIC)
    cv.imwrite(_PicLocation, im2)  # 从新写入素材
    return _PicLocation  # 返回素材位置


def CombinePicOpenVC(_pathPic1, _pathPic2):
    # 底图 _pathPic1 为底图位置
    img1 = cv.imread(ModifySize(_pathPic1, 1000, 1000))
    # 素材 _pathPic2 为素材位置
    img2 = cv.imread(ModifySize(_pathPic2, 1000, 1000))
    # 合并，其中参数1表示透明度，第一个1表示img1不透明，第二个1表示img1不透明，如果改成0.5表示合并的时候已多少透明度覆盖。
    img_mix = cv.addWeighted(img1, 1, img2, 0.1, 0)
    # 合并完毕，_pathPic1底图被修改成合并后的图片
    cv.imwrite('result.jpg', img_mix)


def perspective(image_path):
    dst_path = image_path+'_perspective.png'
    im = cv.imread(image_path)
    # img1 = cv.imread('box.jpg')
    src = np.float32([[0, 0], [900, 0], [900, 600], [0, 600]])
    dst = np.float32([[79, 418], [266, 529], [252, 777], [79, 617]])
    M = cv.getPerspectiveTransform(src, dst)
    h, w, c = im.shape
    img2 = cv.warpPerspective(im, M, (1000, 1000))
    cv.imwrite(dst_path, img2)


CombinePicOpenVC(
    'box.jpg', 'remove_one_color_pillowheidilanziMDTZ.png_perspective.png')
