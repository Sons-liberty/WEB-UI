# AI图像处理服务 - API接口文档

## 📋 概述

这是一个基于Flask的AI图像处理服务，提供文档处理、智能抠图、去水印等功能。本文档详细说明所有可用的API接口。

**Base URL**: `http://localhost:5000` (默认配置)

**支持的图片格式**: JPG, PNG, WEBP

**最大图片大小**: 建议不超过10MB

---

## 🔌 API端点列表

### 1. 健康检查

检查服务运行状态和已加载的AI服务。

**端点**: `GET /api/health`

**请求参数**: 无

**响应示例**:
```json
{
  "status": "healthy",
  "pipelines_loaded": 12,
  "available_services": [
    "print_auto_hq",
    "print_auto_hq_no_dewarp",
    "print_deshadow",
    "print_deblack",
    "print_enhance",
    "matting_person_pet",
    "matting_stuff",
    "matting_graphic_logo",
    "matting_text_seal",
    "watermark_auto",
    "watermark_nature",
    "watermark_doc"
  ]
}
```

**字段说明**:
- `status`: 服务状态 (healthy/unhealthy)
- `pipelines_loaded`: 已加载的AI服务数量
- `available_services`: 可用的服务ID列表

---

### 2. 获取可用服务列表

获取按类别和子类别组织的所有可用AI服务。

**端点**: `GET /api/services`

**请求参数**: 无

**响应示例**:
```json
{
  "document": {
    "print": [
      {
        "id": "print_auto_hq",
        "name": "一键变清晰",
        "description": "矫正、展平, 去阴影、黑底、摩尔纹、模糊, 淡变黑, 变清晰"
      },
      {
        "id": "print_auto_hq_no_dewarp",
        "name": "变清晰",
        "description": "去阴影、黑底、摩尔纹、模糊, 淡变黑, 变清晰"
      },
      {
        "id": "print_deshadow",
        "name": "去阴影",
        "description": "去文档阴影"
      },
      {
        "id": "print_deblack",
        "name": "去黑底",
        "description": "去文档黑底"
      },
      {
        "id": "print_enhance",
        "name": "美化增强",
        "description": "美化文档并加黑文字"
      }
    ]
  },
  "matting": {
    "matting": [
      {
        "id": "matting_person_pet",
        "name": "人像宠物",
        "description": "主体人像、宠物"
      },
      {
        "id": "matting_stuff",
        "name": "商品物品",
        "description": "主体商品物品"
      },
      {
        "id": "matting_graphic_logo",
        "name": "图形logo",
        "description": "主体图形、Logo"
      },
      {
        "id": "matting_text_seal",
        "name": "文字印章",
        "description": "完整文字、印章"
      }
    ]
  },
  "watermark": {
    "watermark": [
      {
        "id": "watermark_auto",
        "name": "自动",
        "description": "各场景自动去水印"
      },
      {
        "id": "watermark_nature",
        "name": "自然",
        "description": "去自然场景水印"
      },
      {
        "id": "watermark_doc",
        "name": "文档",
        "description": "去文档场景水印"
      }
    ]
  }
}
```

**数据结构说明**:
- `document`: 文档处理类别
  - `print`: 打印/文档增强子类别
- `matting`: 抠图类别
  - `matting`: 抠图子类别
- `watermark`: 去水印类别
  - `watermark`: 去水印子类别

---

### 3. 处理单张图片

处理单张图片的主要接口。

**端点**: `POST /api/process`

**Content-Type**: `application/json`

**请求体**:
```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "service": "print_auto_hq"
}
```

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| image | string | 是 | Base64编码的图片数据，支持带data URI前缀或纯base64字符串 |
| service | string | 是 | 服务ID，可从 `/api/services` 获取 |

**成功响应** (200 OK):
```json
{
  "success": true,
  "result": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "service": "print_auto_hq",
  "type": "image"
}
```

**响应字段说明**:
- `success`: 处理是否成功
- `result`: Base64编码的处理结果图片 (包含data URI前缀)
- `service`: 使用的服务ID
- `type`: 返回类型，固定为 "image"

**错误响应**:

**400 Bad Request** - 缺少参数:
```json
{
  "error": "Missing image or service parameter"
}
```

**400 Bad Request** - 无效的图片数据:
```json
{
  "error": "Invalid image data"
}
```

**400 Bad Request** - 服务不可用:
```json
{
  "error": "Service not available: invalid_service_id"
}
```

**500 Internal Server Error** - 处理失败:
```json
{
  "error": "Processing failed: [错误详情]"
}
```

**500 Internal Server Error** - Pipeline返回空结果:
```json
{
  "error": "Pipeline returned no result"
}
```

**500 Internal Server Error** - 结果编码失败:
```json
{
  "error": "Failed to encode result image"
}
```

---

### 4. 批量处理图片

批量处理多张图片的接口。

**端点**: `POST /api/batch_process`

**Content-Type**: `application/json`

**请求体**:
```json
{
  "images": [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA..."
  ],
  "service": "matting_person_pet"
}
```

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| images | array | 是 | Base64编码的图片数据数组 |
| service | string | 是 | 服务ID，应用于所有图片 |

**成功响应** (200 OK):
```json
{
  "success": true,
  "results": [
    {
      "success": true,
      "result": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    },
    {
      "success": true,
      "result": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ],
  "service": "matting_person_pet",
  "type": "image"
}
```

**部分失败响应** (200 OK):
```json
{
  "success": true,
  "results": [
    {
      "success": true,
      "result": "data:image/png;base64,..."
    },
    {
      "error": "Invalid image data for image 1"
    },
    {
      "error": "Error processing image 2: [错误详情]"
    }
  ],
  "service": "matting_person_pet",
  "type": "image"
}
```

**响应字段说明**:
- `success`: 批量请求是否成功提交
- `results`: 结果数组，每个元素对应一张输入图片
  - 成功时包含 `success: true` 和 `result` (base64图片)
  - 失败时包含 `error` (错误信息)
- `service`: 使用的服务ID
- `type`: 固定为 "image"

**错误响应**:

**400 Bad Request** - 缺少参数:
```json
{
  "error": "Missing images or service parameter"
}
```

**400 Bad Request** - 服务不可用:
```json
{
  "error": "Service not available: invalid_service_id"
}
```

**500 Internal Server Error** - 批量处理失败:
```json
{
  "error": "Batch processing failed: [错误详情]"
}
```

---

## 🎯 可用服务ID详解

### 文档处理类 (Document Processing)

| Service ID | 名称 | 功能说明 | 适用场景 |
|------------|------|----------|----------|
| `print_auto_hq` | 一键变清晰 | 矫正、展平, 去阴影、黑底、摩尔纹、模糊, 淡变黑, 变清晰 | 拍摄的文档照片，需要全面处理 |
| `print_auto_hq_no_dewarp` | 变清晰 | 去阴影、黑底、摩尔纹、模糊, 淡变黑, 变清晰（不矫正） | 扫描件或已矫正的文档 |
| `print_deshadow` | 去阴影 | 专门去除文档阴影 | 有阴影的文档照片 |
| `print_deblack` | 去黑底 | 去除文档黑底，转换为白底 | 黑底文档、夜间拍摄的文档 |
| `print_enhance` | 美化增强 | 美化文档并加黑文字 | 需要提升视觉效果的文档 |

### 智能抠图类 (Matting)

| Service ID | 名称 | 功能说明 | 适用场景 |
|------------|------|----------|----------|
| `matting_person_pet` | 人像宠物 | 精准识别并抠出人像、宠物 | 人像、宠物照片背景去除 |
| `matting_stuff` | 商品物品 | 精准抠出商品物品 | 电商产品图、物品展示 |
| `matting_graphic_logo` | 图形Logo | 抠取图形、Logo设计元素 | Logo提取、图形设计 |
| `matting_text_seal` | 文字印章 | 完整提取文字、印章 | 印章提取、文字抠图 |

### 去水印类 (Watermark Removal)

| Service ID | 名称 | 功能说明 | 适用场景 |
|------------|------|----------|----------|
| `watermark_auto` | 自动去水印 | 智能识别各场景水印并去除 | 通用场景，自动检测水印 |
| `watermark_nature` | 自然场景 | 针对自然场景优化的去水印 | 风景照、自然场景照片 |
| `watermark_doc` | 文档场景 | 针对文档场景优化的去水印 | 文档、证件上的水印 |

---

## 💻 使用示例

### JavaScript (Fetch API)

```javascript
// 1. 健康检查
fetch('http://localhost:5000/api/health')
  .then(response => response.json())
  .then(data => console.log(data));

// 2. 获取可用服务
fetch('http://localhost:5000/api/services')
  .then(response => response.json())
  .then(services => console.log(services));

// 3. 处理单张图片
async function processImage(imageFile, serviceId) {
  // 将文件转换为base64
  const reader = new FileReader();
  const base64Image = await new Promise((resolve) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(imageFile);
  });

  // 发送处理请求
  const response = await fetch('http://localhost:5000/api/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64Image,
      service: serviceId
    })
  });

  const result = await response.json();

  if (result.success) {
    // 显示结果图片
    const img = document.createElement('img');
    img.src = result.result;
    document.body.appendChild(img);
  } else {
    console.error('处理失败:', result.error);
  }
}

// 4. 批量处理
async function batchProcess(imageFiles, serviceId) {
  // 转换所有文件为base64
  const base64Images = await Promise.all(
    Array.from(imageFiles).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    })
  );

  // 发送批量处理请求
  const response = await fetch('http://localhost:5000/api/batch_process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      images: base64Images,
      service: serviceId
    })
  });

  const result = await response.json();

  if (result.success) {
    result.results.forEach((item, index) => {
      if (item.success) {
        console.log(`图片 ${index} 处理成功`);
        // 处理结果图片: item.result
      } else {
        console.error(`图片 ${index} 处理失败:`, item.error);
      }
    });
  }
}
```

### Python (requests)

```python
import requests
import base64
from io import BytesIO
from PIL import Image

BASE_URL = "http://localhost:5000"

# 1. 健康检查
def health_check():
    response = requests.get(f"{BASE_URL}/api/health")
    return response.json()

# 2. 获取可用服务
def get_services():
    response = requests.get(f"{BASE_URL}/api/services")
    return response.json()

# 3. 处理单张图片
def process_image(image_path, service_id):
    # 读取图片并转换为base64
    with open(image_path, 'rb') as f:
        image_data = base64.b64encode(f.read()).decode()

    # 添加data URI前缀
    image_base64 = f"data:image/png;base64,{image_data}"

    # 发送请求
    response = requests.post(
        f"{BASE_URL}/api/process",
        json={
            "image": image_base64,
            "service": service_id
        }
    )

    result = response.json()

    if result.get('success'):
        # 解析返回的base64图片
        result_base64 = result['result'].split(',')[1]
        image_data = base64.b64decode(result_base64)
        image = Image.open(BytesIO(image_data))
        return image
    else:
        raise Exception(result.get('error'))

# 4. 批量处理
def batch_process(image_paths, service_id):
    # 读取所有图片
    base64_images = []
    for path in image_paths:
        with open(path, 'rb') as f:
            image_data = base64.b64encode(f.read()).decode()
            base64_images.append(f"data:image/png;base64,{image_data}")

    # 发送请求
    response = requests.post(
        f"{BASE_URL}/api/batch_process",
        json={
            "images": base64_images,
            "service": service_id
        }
    )

    result = response.json()

    if result.get('success'):
        images = []
        for i, item in enumerate(result['results']):
            if item.get('success'):
                result_base64 = item['result'].split(',')[1]
                image_data = base64.b64decode(result_base64)
                image = Image.open(BytesIO(image_data))
                images.append(image)
            else:
                print(f"图片 {i} 处理失败: {item.get('error')}")
                images.append(None)
        return images
    else:
        raise Exception(result.get('error'))

# 使用示例
if __name__ == "__main__":
    # 健康检查
    print(health_check())

    # 获取服务列表
    services = get_services()
    print(services)

    # 处理单张图片
    result_image = process_image("input.jpg", "print_auto_hq")
    result_image.save("output.png")

    # 批量处理
    images = batch_process(["img1.jpg", "img2.jpg"], "matting_person_pet")
    for i, img in enumerate(images):
        if img:
            img.save(f"result_{i}.png")
```

### cURL

```bash
# 1. 健康检查
curl http://localhost:5000/api/health

# 2. 获取可用服务
curl http://localhost:5000/api/services

# 3. 处理单张图片
curl -X POST http://localhost:5000/api/process \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "service": "print_auto_hq"
  }'

# 4. 批量处理
curl -X POST http://localhost:5000/api/batch_process \
  -H "Content-Type: application/json" \
  -d '{
    "images": ["data:image/png;base64,...", "data:image/png;base64,..."],
    "service": "matting_person_pet"
  }'
```

---

## 🔧 前端集成注意事项

### 1. Base64图片处理

- **接受格式**: API接受带有或不带有data URI前缀的base64字符串
  - 带前缀: `data:image/png;base64,iVBORw0KGgoAAAA...`
  - 不带前缀: `iVBORw0KGgoAAAA...`
- **返回格式**: API始终返回带data URI前缀的base64字符串
- **建议**: 前端发送时使用带前缀格式，便于直接赋值给`<img>`标签

### 2. 图片大小限制

- 建议单张图片不超过10MB
- 批量处理时注意总数据大小
- 超大图片可能导致处理超时或内存不足

### 3. 错误处理

```javascript
async function safeProcessImage(imageFile, serviceId) {
  try {
    const base64Image = await fileToBase64(imageFile);

    const response = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: base64Image,
        service: serviceId
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '处理失败');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || '处理失败');
    }

    return result.result;
  } catch (error) {
    console.error('图片处理错误:', error);
    // 显示用户友好的错误消息
    alert(`处理失败: ${error.message}`);
    return null;
  }
}
```

### 4. 加载状态提示

处理图片可能需要几秒到几十秒，建议：
- 显示加载动画或进度条
- 禁用提交按钮防止重复提交
- 提供取消功能（如果需要）

### 5. 抠图结果展示

抠图服务返回的是带透明背景的PNG图片：
- 使用棋盘格背景显示透明效果
- CSS示例见现有前端代码中的 `.alpha-background` 类

### 6. 跨域配置

API已配置CORS支持，允许跨域请求：
```python
# Flask已配置
from flask_cors import CORS
CORS(app)
```

如需限制特定域名，可修改 [web_api.py](web_api.py:14) 中的CORS配置。

### 7. 服务状态检查

建议在应用启动时调用 `/api/health` 检查服务状态：
```javascript
async function checkServiceHealth() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();

    if (data.status === 'healthy' && data.pipelines_loaded > 0) {
      console.log(`✅ 服务正常，已加载 ${data.pipelines_loaded} 个AI服务`);
      return true;
    } else {
      console.warn('⚠️ 服务异常');
      return false;
    }
  } catch (error) {
    console.error('❌ 无法连接到服务:', error);
    return false;
  }
}
```

---

## 🚀 性能优化建议

### 1. 批量处理 vs 单独处理

- **批量处理优势**: 减少HTTP请求次数
- **单独处理优势**:
  - 更快的首张图片响应
  - 更好的错误隔离
  - 可以显示逐张进度

**建议策略**:
```javascript
// 少于5张图片：使用批量处理
if (images.length < 5) {
  batchProcess(images, serviceId);
}
// 5张及以上：并发单独处理（限制并发数）
else {
  processImagesWithConcurrency(images, serviceId, 3);
}
```

### 2. 图片压缩

上传前压缩图片可以：
- 减少网络传输时间
- 降低服务器内存压力
- 加快处理速度

```javascript
async function compressImage(file, maxWidth = 2048, quality = 0.9) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
```

### 3. 缓存策略

对于重复处理相同图片和服务的场景，可以实现客户端缓存：
```javascript
const processCache = new Map();

async function cachedProcess(imageBase64, serviceId) {
  const cacheKey = `${serviceId}:${hashString(imageBase64)}`;

  if (processCache.has(cacheKey)) {
    return processCache.get(cacheKey);
  }

  const result = await processImage(imageBase64, serviceId);
  processCache.set(cacheKey, result);

  return result;
}
```

---

## 📊 API限制和注意事项

### 当前限制
- ✅ 无速率限制 (开发环境)
- ✅ 无认证要求
- ✅ 无请求大小限制（受Flask默认限制）

### 生产环境建议
1. 添加速率限制，防止滥用
2. 实施API密钥或JWT认证
3. 设置请求大小限制
4. 添加请求日志和监控
5. 实现请求队列，避免过载

### 错误码总结

| HTTP状态码 | 说明 | 常见原因 |
|-----------|------|----------|
| 200 | 成功 | 请求正常处理 |
| 400 | 请求错误 | 缺少参数、无效数据、服务ID错误 |
| 500 | 服务器错误 | AI处理失败、内存不足、模型错误 |

---

## 🔍 调试技巧

### 1. 启用详细日志
```bash
python start_web_service.py --debug
```

### 2. 测试服务是否正常
```bash
# 测试健康检查
curl http://localhost:5000/api/health

# 使用测试脚本
python test_web_service.py
```

### 3. 浏览器开发者工具
- Network标签查看请求/响应
- Console查看JavaScript错误
- 检查请求payload大小

---

## 📝 更新日志

### v1.0 (当前版本)
- ✅ 基础API接口
- ✅ 12个AI服务
- ✅ 批量处理支持
- ✅ Base64图片传输
- ✅ CORS支持

### 未来计划
- ⏳ WebSocket支持（实时进度）
- ⏳ 文件上传支持（multipart/form-data）
- ⏳ 任务队列系统
- ⏳ 结果缓存
- ⏳ API认证

---

## 📞 技术支持

如有问题或建议，请查看：
- 主文档: [README_WEB.md](README_WEB.md)
- 部署文档: [DEPLOYMENT.md](DEPLOYMENT.md)
- 源代码: [web_api.py](web_api.py)

---

**文档版本**: v1.0
**最后更新**: 2025-12-22
**API版本**: v1
