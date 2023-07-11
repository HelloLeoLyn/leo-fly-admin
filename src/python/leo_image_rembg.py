from rembg import remove
from PIL import Image
import requests
from io import BytesIO
import sys
def exe(inputFileType, inputFile, outputFile):
  if inputFileType=='http':
    # 发送GET请求并获取图片数据
    response = requests.get(inputFile)
    # 将图片数据读取为字节流
    image_data = BytesIO(response.content)
    image = Image.open(image_data)
  else:
    image = Image.open(inputFile) 
  if image.mode=='RGBA':
    image = image.convert("RGB")
  output = remove(image)
  output.save(outputFile,'png')

if __name__ == '__main__':
    # inputFileType = sys.argv[1]
    # inputFile = sys.argv[2]
    # outputFile = sys.argv[3]
   
    inputFileType = "http"
    inputFile = "http://127.0.0.1:8080/img/3/17727.jpg?1686213741317"
    outputFile = "E:/image/308/1686216865311.jpg"
    exe(inputFileType, inputFile, outputFile)
    print({'msg':'ok','detail':[inputFileType, inputFile, outputFile]})
