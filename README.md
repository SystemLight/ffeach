# ffeach

[![NPM version](https://img.shields.io/npm/v/ffeach.svg)](https://www.npmjs.com/package/ffeach)

> 大文件切片实用工具

### 依赖项

- spark-md5

### 安装

```
npm i ffeach
```

### 接口说明

- ffeach.ffeach() 创建FileForeach对象工厂函数
  参数： file(必填) File对象
  参数： chunkSize(选填) 单个文件块大小，单位bytes

- new ffeach.FileForeach() 文件分块函数，主要用于文件提取分割后的数据块
  参数： file(必填) File对象
  参数： chunkSize(选填) 单个文件块大小，单位bytes

- FileForeach#isOutRange() 判断文件是否超出可提取的大小
- FileForeach#nextLoad() 获取下一个文件块，返回Blob对象
- FileForeach#forEach() 遍历File对象切割的文件块
  参数： callback(必填) 回调函数，接收一个blob对象为文件数据块

注意：当数据块被遍历完毕后，将无法再产出文件块，FileForeach不保存任何数据块，为了节省空间
如果需要二次遍历，需要重新创建FileForeach对象

- ffeach.hashFile() 对文件进行hash运算，该方法异步执行
  参数： file(必填) File对象
  参数： callback(选填) 接收运算完的hash结果值函数
  参数： chunkSize(选填) 单个文件块大小，单位bytes

### 使用举例

```html
<input type="file" id="file">
<script src="https://unpkg.com/spark-md5@3.0.2/spark-md5.js"></script>
<script src="main.bundle.js"></script>
<script>
  document.getElementById('file').addEventListener('change', function (e) {
    ffeach.hashFile(this.files[0], (result) => {
      console.log(result)
    })

    ffeach.ffeach(this.files[0], 1024).forEach((chunkIndex, blob) => {
      console.log(blob)
    })
  })
</script>
```
