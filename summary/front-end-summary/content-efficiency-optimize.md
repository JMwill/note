# 优化内容效率

## 删除不必要的下载

+ 清点网页上所有自己的和第三方的资源
+ 评估每个资源的表现：资源的价值及其技术性能
+ 确定这些资源是否提供了足够的价值

## 优化基于文本的资产的编码和传输大小

+ 数据压缩 101
+ 源码压缩：预处理和特定于内容的优化
+ 使用 GZIP 进行文本压缩

## 图片优化

### 删除和替换图片

+ 删除不必要的图片资源
+ 尽可能利用 CSS3 效果
+ 使用网络字体取代在图片中进行文字编码

### 矢量图与光栅图

+ 矢量图最适用于由几何图形组成的图片
+ 矢量图与缩放和分辨率无关
+ 光栅图应该用于包含许多不规则形状和细节的复杂场景

### 高分辨率屏幕的含义

+ 高分辨率屏幕的每个 CSS 像素包含多个设备像素
+ 高分辨率图片所需的像素数和字节数要多得多
+ 任何分辨率都采用相同的图片优化方法

### 优化矢量图

+ SVG 是基于 XML 的图片格式
+ SVG 文件应进行缩减，以减小文件大小
+ SVG 文件应使用 GZIP 进行压缩
+ 缩减工具:[svgo][svgo site]

### 优化光栅图 (浏览器对图片进行解码时，每个像素始终占用 4 个字节的内存。)
 + 光栅图是像素栅格
 + 每个像素编码了颜色和透明度信息
 + 图片压缩程序使用不同的方法减少每个像素所需的位数，以减小图片的文件大小
当需要的图片颜色值并不丰富的时候,可以通过采用减少位深来缩减体积,即减少为总共8位通道,共256色。不适用与颜色丰富的图片

### 无损图片压缩与有损图片压缩

+ 由于眼睛的工作方式，图片非常适用于有损压缩
+ 图片优化是进行有损压缩和无损压缩的一项功能
+ 图片格式的差异是由于优化图片时所使用的有损算法和无损算法的差异以及使用方式的差异
+ 不存在任何适用于所有图片的最佳格式或'质量设置'：每个特定压缩程序和图片内容的组合都产生独特的输出

### 选择正确的图片格式

+ 首先选择正确的通用格式：GIF、PNG、JPEG
+ 体验并选择每种格式的最佳设置：质量、调色板大小等
+ 考虑为较新的客户端添加 WebP 和 JPEG XR 资源 缩放的图片：
+ 提供缩放的资源是最简单、最有效的优化方法之一
+ 密切关注较大的资源，因为这些资源会产生大量额外开销
+ 通过将图片缩放到显示尺寸，减少不必要的像素数

### 工具和参数调优

[gifsicle][gifsicle tool]:      创建和优化 GIF 图片</br>
[jpegtran][jpegtran tool]:      优化 JPEG 图片</br>
[optipng][optipng tool]:        无损 PNG 优化</br>
[pngquant][pngquant tool]:      有损 PNG 优化</br>

### 提供缩放的图片资源

图片优化的两个标准:

1. 优化用于为每个图片像素进行编码的字节数以及优化像素总数
2. 图片的文件大小就是像素总数乘以用于为每个像素进行编码的字节数，不多不少

### 图片优化检查表

+ 首选矢量格式：矢量图与分辨率和缩放无关，最适用于多设备或高分辨率的情况
+ 缩减和压缩 SVG 资源：大多数绘图应用程序生成的 XML 标记通常包含不必要的元数据，可以删除；确保服务器配置为对 SVG 资源采用 GZIP 压缩。
+ 选择最佳光栅图格式：确定功能要求，然后选择适合每个特定资源的格式。
+ 体验光栅格式的最优质量设置：随意降低’质量’设置，效果通常非常好，而字节可能会节省很多。
+ 删除不必要的图片元数据：许多光栅图包含不必要的资源元数据：地理信息、相机信息等。使用适合的工具删除这些数据。
+ 提供缩放的图片：调整服务器上的图片尺寸，确保’显示’尺寸尽可能接近图片的’自然’尺寸。尤其要密切关注较大的图片，因为这些图片在调整尺寸时，占用了最大的额外开销！
+ 自动、自动、自动：投资自动化的工具和基础设施，这样，可以确保所有图片资源始终会进行优化。

## 网页字体优化

### 网页字体解析

+ Unicode 字体可以包含数千种字形
+ 有四种字体格式：WOFF2、WOFF、EOT、TTF
+ 某些字体格式需要使用 GZIP 压缩

#### 网页字体格式

+ 将 WOFF 2.0 变体提供给支持它的浏览器
+ 将 WOFF 变体提供给大多数浏览器
+ 将 TTF 变体提供给旧 Android（4.4 版以下）浏览器
+ 将 EOT 变体提供给旧 IE（IE9 之下）浏览器

#### 通过压缩减小字体大小([压缩工具zopfli][zopfli tool])

+ EOT 和 TTF 格式默认情况下不会进行压缩：交付这些格式时，请确保您的服务器已配置为应用 GZIP 压缩。
+ WOFF 具有内建压缩 - 确保您的 WOFF 压缩工具正在使用最佳压缩设置。
+ WOFF2 使用自定义预处理和压缩算法对其他格式交付 ~30% 的文件大小减小

### 使用 @font-face 定义字体系列

+ 使用 format() 提示指定多种字体格式
+ 对大型 unicode 字体进行子集内嵌以提高性能：使用 unicode-range 子集内嵌，并为较旧的浏览器提供手动子集内嵌回退
+ 减少风格字体变体的数量以改进网页和文本呈现性能

例子

```
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome.woff2') format('woff2'), 
       url('/fonts/awesome.woff') format('woff'),
       url('/fonts/awesome.ttf') format('ttf'),
       url('/fonts/awesome.eot') format('eot');
}

@font-face {
  font-family: 'Awesome Font';
  font-style: italic;
  font-weight: 400;
  src: local('Awesome Font Italic'), /* local()指令,引用、加载和使用本地安装的字体 */
       url('/fonts/awesome-i.woff2') format('woff2'), 
       url('/fonts/awesome-i.woff') format('woff'),
       url('/fonts/awesome-i.ttf') format('ttf'),
       url('/fonts/awesome-i.eot') format('eot');
  unicode-range: U+000-5FF; /* 拉丁字形,  */
}
```

### 优化加载和呈现

+ 在构造呈现树之前，会延迟字体请求，这可能会导致文本呈现延迟
+ 通过字体加载API，我们可以执行自定义字体加载和覆盖默认延迟加载字体加载的呈现策略
+ 通过字体内联，我们可以在较旧的浏览器中覆盖默认延迟加载字体加载

#### 使用字体加载 API 优化字体呈现

例子

```
var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
  style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
});

font.load(); // don't wait for render tree, initiate immediate fetch!

font.ready().then(function() {
  // apply the font (which may rerender text and cause a page reflow)
  // once the font has finished downloading
  document.fonts.add(font);
  document.body.style.fontFamily = "Awesome Font, serif";

  // OR... by default content is hidden, and rendered once font is available
  var content = document.getElementById("content");
  content.style.visibility = "visible";

  // OR... apply own render strategy here... 
});
```

辅助工具: [字体加载器][FontLoader]，[网页字体加载器库][Web FontLoader]

#### 使用 HTTP 缓存优化字体重复使用

### 优化检查表

1. 审核和监控您的字体使用： 不要在您的网页上使用太多字体，并且对于每种字体，请将使用的变体的数量减至最少。这将帮助为您的用户交付更加一致和更加快速的体验。
2. 对您的字体资源进行子集内嵌： 许多字体可以进行子集内嵌，或划分为多个 unicode-range 以仅交付某个特定网页需要的字形 - 这样就减小了文件大小并加快了资源的下载速度。但是，在定义子集时，请小心优化字体重新使用 - 例如，您不需要在每个网页上下载一种不同但重叠的字符集。一个比较好的做法是基于标记进行子集内嵌 - 例如拉丁文、西里尔文等。
3. 为每个浏览器交付优化的字体格式： 每种字体都应以 WOFF2、WOFF、EOT 和 TTF 格式提供。确保向 EOT 和 TTF 格式应用 GZIP 压缩，因为默认情况下不会对它们进行压缩。
4. 指定重新验证和最佳缓存策略： 字体是不经常更新的静态资源。确保您的服务器提供一个长期的最大年龄时间戳和一个重新验证令牌，以允许在不同网页之间有效的字体重复使用。
5. 使用字体加载 API 来优化关键呈现路径： 默认延迟加载行为可能会导致文本呈现延迟。通过使用字体加载 API，对于特定字体，我们可以替代此行为，并为网页上不同的内容指定自定义呈现和超时策略。对于不支持 API 的较旧浏览器，您可以使用 webfontloader JavaScript 库或使用 CSS 内联策略。

## HTTP缓存

### 使用 ETag 验证缓存的响应(确保服务器提供必要的 ETag 令牌)

+ 服务器通过 ETag HTTP 头传递验证令牌
+ 通过验证令牌可以进行高效的资源更新检查：如果资源未更改，则不会传输任何数据。

### Cache-Control

+ 每个资源都可以通过 Cache-Control HTTP 头来定义自己的缓存策略
+ Cache-Control 指令控制谁在什么条件下可以缓存响应以及可以缓存多久

#### no-cache 和 no-store

+ no-cache表示必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。
+ 相比之下，no-store更加简单，直接禁止浏览器和所有中继缓存存储返回的任何版本的响应 - 例如：一个包含个人隐私数据或银行数据的响应。每次用户请求该资源时，都会向服务器发送一个请求，每次都会下载完整的响应。

#### public和 private

+ 如果响应被标记为public，即使有关联的 HTTP 认证，甚至响应状态码无法正常缓存，响应也可以被缓存。大多数情况下，public不是必须的，因为明确的缓存信息（例如max-age）已表示 响应可以被缓存
+ 相比之下，浏览器可以缓存private响应，但是通常只为单个用户缓存，因此，不允许任何中继缓存对其进行缓存 - 例如，用户浏览器可以缓存包含用户私人信息的 HTML 网页，但是 CDN 不能缓存。

#### max-age

该指令指定从当前请求开始，允许获取的响应被重用的最长时间（单位为秒） - 例如：max-age=60表示响应可以再缓存和重用 60 秒。

### 定义最优 Cache-Control 策略



审查您的网页，确定哪些资源可以被缓存，并确保可以返回正确的 Cache-Control 和 ETag 头.

### 废弃和更新已缓存的响应(在不更改资源网址的情况下，我不到)

+ 在资源"过期"之前，将一直使用本地缓存的响应
+ 通过将文件内容指纹码嵌入网址，我们可以强制客户端更新到新版的响应
+ 为了获得最佳性能，每个应用需要定义自己的缓存层级

因为能够定义每个资源的缓存策略，所以，我们可以定义’缓存层级’，这样，不但可以控制每个响应的缓存时间，还可以控制访问者看到新版本的速度

+ HTML 被标记成no-cache，这意味着浏览器在每次请求时都会重新验证文档，如果内容更改，会获取最新版本。同时，在 HTML 标记中，我们在 CSS 和 JavaScript 资源的网址中嵌入指纹码：如果这些文件的内容更改，网页的 HTML 也会随之更改，并将下载 HTML 响应的新副本。
+ 允许浏览器和中继缓存（例如 CDN）缓存 CSS，过期时间设置为 1 年。注意，我们可以放心地使用 1 年的’远期过期’，因为我们在文件名中嵌入了文件指纹码：如果 CSS 更新，网址也会随之更改。
+ JavaScript 过期时间也设置为 1 年，但是被标记为 private，也许是因为包含了 CDN 不应缓存的一些用户私人数据。
+ 缓存图片时不包含版本或唯一指纹码，过期时间设置为 1 天

### 缓存检查表

不存在最佳的缓存策略。根据您的通信模式、提供的数据类型以及应用特定的数据更新要求，必须定义和配置每个资源最适合的设置以及整体的’缓存层级’。

1. 使用一致的网址：如果您在不同的网址上提供相同的内容，将会多次获取和存储该内容。
2. 确保服务器提供验证令牌 (ETag)：通过验证令牌，如果服务器上的资源未被更改，就不必传输相同的字节
3. 确定中继缓存可以缓存哪些资源：对所有用户的响应完全相同的资源很适合由 CDN 或其他中继缓存进行缓存。
4. 确定每个资源的最优缓存周期：不同的资源可能有不同的更新要求。审查并确定每个资源适合的 max-age。
5. 确定网站的最佳缓存层级：对 HTML 文档组合使用包含内容指纹码的资源网址以及短时间或 no-cache 的生命周期，可以控制客户端获取更新的速度
6. 搅动最小化：有些资源的更新比其他资源频繁。如果资源的特定部分（例如 JavaScript 函数或一组 CSS 样式）会经常更新，应考虑将其代码作为单独的文件提供。这样，每次获取更新时，剩余内容（例如不会频繁更新的库代码）可以从缓存中获取，确保下载的内容量最少。

[svgo site]:        https://github.com/svg/svgo
[gifsicle tool]:    http://www.lcdf.org/gifsicle/
[jpegtran tool]:    http://jpegclub.org/jpegtran/
[optipng tool]:     http://optipng.sourceforge.net/
[pngquant tool]:    http://pngquant.org/
[zopfli tool]:      http://en.wikipedia.org/wiki/Zopfli
[FontLoader]:       https://github.com/bramstein/fontloader
[Web FontLoader]:   https://github.com/typekit/webfontloader