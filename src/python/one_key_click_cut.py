import paddlehub as hub
import cv2
import matplotlib.pyplot as plt

# 加载DeepLabv3+模型
model = hub.Module(name='deeplabv3p_xception65_humanseg')

# 读取图像
image = cv2.imread('input_image.jpg')

# 进行图像分割
results = model.segmentation(images=[image])

# 获取分割结果
mask = results[0]['data']

# 将分割结果应用到原始图像上
result = cv2.bitwise_and(image, image, mask=mask)

# 显示结果
plt.subplot(131), plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)), plt.title('Original')
plt.subplot(132), plt.imshow(mask, cmap='gray'), plt.title('Mask')
plt.subplot(133), plt.imshow(cv2.cvtColor(result, cv2.COLOR_BGR2RGB)), plt.title('Cutout')
plt.show()

# 保存结果
cv2.imwrite('cutout_image.jpg', result)
