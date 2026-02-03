// // Written by Dor Verbin, October 2021
// // This is based on: http://thenewcode.com/364/Interactive-Before-and-After-Video-Comparison-in-HTML5-Canvas
// // With additional modifications based on: https://jsfiddle.net/7sk5k4gp/13/
// // Modified by Keunhong Park to be responsive to window size.


// Number.prototype.clamp = function (min, max) {
//     return Math.min(Math.max(this, min), max);
// };


// class VideoComparison {
//     constructor(container) {
//         this.container = container;
//         this.position = 0.5;
//         this.canvas = container.find('canvas');
//         this.video = container.find('video');
//         this.context = this.canvas[0].getContext("2d");

//         this.isPlaying = false;

//         this.label = container.data('label') || "Label 1"; // Get the first label, default to "Label 1"
//         this.label2 = container.data('label2') || "Label 2"; // Get the second label, default to "Label 2"

//         this.video[0].style.height = "0px";  // Hide video without stopping it
//         // this.video[0].playbackRate = 0.5;

//         let self = this;
//         container.on('tab:show', function (e) {
//             self.playWhenReady();
//         });
//         container.on('tab:hide', function(e) {
//             // self.video[0].pause();
//             self.pause();
//         });

//         function trackLocation(e) {
//             // Normalize to [0, 1]
//             self.bcr = self.canvas[0].getBoundingClientRect();
//             self.position = ((e.pageX - self.bcr.x) / self.bcr.width);
//         }
//         function trackLocationTouch(e) {
//             // Normalize to [0, 1]
//             self.bcr = self.canvas[0].getBoundingClientRect();
//             self.position = ((e.touches[0].pageX - self.bcr.x) / self.bcr.width);
//         }

//         this.canvas.on('mousemove', trackLocation);
//         this.canvas.on('touchstart', trackLocationTouch);
//         this.canvas.on('touchmove', trackLocationTouch);
//         this.canvas.on('mouseout', function () { self.position = 0.5; });

//         $(window).on('resize', function (e) {
//             self.resize();
//         });
//     }

//     resize() {
//         const videoWidth = this.video[0].videoWidth / 2;
//         const videoHeight = this.video[0].videoHeight;
//         const canvasWidth = this.container.width();
//         const canvasHeight = canvasWidth * videoHeight / videoWidth;
//         this.canvas[0].width = canvasWidth;
//         this.canvas[0].height = canvasHeight;
//     }

//     play() {
//         this.resize();
//         if (this.isPlaying) {
//             return;
//         }
//         console.log('Playing video', this.video[0])
//         this.isPlaying = true;
//         this.video[0].play();
//         this.drawLoop();
//     }

//     pause() {
//         this.video[0].pause();
//         this.isPlaying = false;
//     }

//     playWhenReady() {
//         console.log('play when ready', this.video[0])
//         const self = this;
//         if (self.video[0].readyState >= 3) {
//             self.play();
//         } else if (!self.readyStateListenerAttached) {
//             document.addEventListener('readystatechange', function () {
//                 if (self.video[0].readyState >= 3) {
//                     self.play();
//                 }
//             });
//         }
//     }

//     drawLoop() {
//         const self = this;
//         const video = this.video[0];
//         const container = this.container;
//         const context = this.context;
//         requestAnimationFrame(drawFrame);

//         function drawFrame() {
//             const videoWidth = video.videoWidth / 2;
//             const videoHeight = video.videoHeight;
//             const canvasWidth = container.width();
//             const canvasHeight = canvasWidth * videoHeight / videoWidth;
//             const position = self.position;

//             context.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvasWidth, canvasHeight);
//             var colStart = (canvasWidth * position).clamp(0.0, canvasWidth);
//             var colWidth = (canvasWidth - (canvasWidth * position)).clamp(0.0, canvasWidth);
//             var sourceColStart = (videoWidth * position).clamp(0.0, videoWidth);
//             var sourceColWidth = (videoWidth - (videoWidth * position)).clamp(0.0, videoWidth);
//             context.drawImage(
//                 video,
//                 sourceColStart + videoWidth, 0,
//                 sourceColWidth, videoHeight,
//                 colStart, 0,
//                 colWidth, canvasHeight);

//             var arrowLength = 0.09 * canvasHeight;
//             var arrowheadWidth = 0.025 * canvasHeight;
//             var arrowheadLength = 0.04 * canvasHeight;
//             var arrowPosY = canvasHeight / 10;
//             var arrowWidth = 0.007 * canvasHeight;
//             var currX = canvasWidth * position;

//             // Draw circle
//             context.arc(currX, arrowPosY, arrowLength * 0.7, 0, Math.PI * 2, false);
//             context.fillStyle = "#FFD79340";
//             context.fill()

//             // Draw border
//             context.beginPath();
//             context.moveTo(canvasWidth * position, 0);
//             context.lineTo(canvasWidth * position, canvasHeight);
//             context.closePath()
//             context.strokeStyle = "#AAAAAA";
//             context.lineWidth = 5;
//             context.stroke();

//             // Draw arrow
//             context.beginPath();
//             context.moveTo(currX, arrowPosY - arrowWidth / 2);

//             // Move right until meeting arrow head
//             context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY - arrowWidth / 2);

//             // Draw right arrow head
//             context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY - arrowheadWidth / 2);
//             context.lineTo(currX + arrowLength / 2, arrowPosY);
//             context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY + arrowheadWidth / 2);
//             context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY + arrowWidth / 2);

//             // Go back to the left until meeting left arrow head
//             context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY + arrowWidth / 2);

//             // Draw left arrow head
//             context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY + arrowheadWidth / 2);
//             context.lineTo(currX - arrowLength / 2, arrowPosY);
//             context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY - arrowheadWidth / 2);
//             context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY);

//             context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY - arrowWidth / 2);
//             context.lineTo(currX, arrowPosY - arrowWidth / 2);

//             context.closePath();

//             context.fillStyle = "#AAAAAA";
//             context.fill();

//             context.font = "30px 'Google Sans', sans-serif";
//             context.fillStyle = "white";
//             context.strokeStyle = 'black';
//             context.lineWidth = 2;
//             context.textAlign = "left";
//             context.textBaseline = "bottom";
//             context.strokeText(self.label, 10, 35)
//             context.fillText(self.label, 10, 35);

//             context.textAlign = "right";
//             context.strokeText(self.label2, canvasWidth - 10, 35)
//             context.fillText(self.label2, canvasWidth - 10, 35);

//             if (self.isPlaying) {
//                 requestAnimationFrame(drawFrame);
//             }
//         }
//     }
// }


// Written by Dor Verbin, October 2021
// Modified for robust autoplay and initialization using IntersectionObserver

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

class VideoComparison {
    constructor(container) {
        this.container = container;
        this.position = 0.5;
        this.canvas = container.find('canvas');
        this.video = container.find('video');
        this.context = this.canvas[0].getContext("2d");

        this.isPlaying = false;
        // 标记是否已经绑定了元数据加载监听器
        this.loadedMetadataListener = false;

        this.label = container.data('label') || "Label 1";
        this.label2 = container.data('label2') || "Label 2";

        // 初始隐藏视频元素，避免显示原始视频
        this.video[0].style.height = "0px";
        this.video[0].style.visibility = "hidden"; // 双重保险

        let self = this;

        // 【核心修改】使用 IntersectionObserver 替代 tab 事件
        // 只要这个组件进入视野（无论是因为加载，还是切换 tab），就尝试播放
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 进入视野：播放
                    self.playWhenReady();
                } else {
                    // 离开视野：暂停
                    self.pause();
                }
            });
        }, { threshold: 0.01 }); // 哪怕只有 1% 可见也触发

        // 开始观察 Canvas 元素
        this.observer.observe(this.canvas[0]);

        // 绑定鼠标/触摸交互事件
        function trackLocation(e) {
            self.bcr = self.canvas[0].getBoundingClientRect();
            self.position = ((e.pageX - self.bcr.x) / self.bcr.width);
        }
        function trackLocationTouch(e) {
            self.bcr = self.canvas[0].getBoundingClientRect();
            self.position = ((e.touches[0].pageX - self.bcr.x) / self.bcr.width);
        }

        this.canvas.on('mousemove', trackLocation);
        this.canvas.on('touchstart', trackLocationTouch);
        this.canvas.on('touchmove', trackLocationTouch);
        this.canvas.on('mouseout', function () { self.position = 0.5; });

        $(window).on('resize', function (e) {
            self.resize();
        });
    }

    resize() {
        // 只有当视频元数据加载完毕， videoWidth 才有效
        if (this.video[0].videoWidth > 0) {
            const videoWidth = this.video[0].videoWidth / 2;
            const videoHeight = this.video[0].videoHeight;
            const canvasWidth = this.container.width();
            
            // 如果容器宽度还是0（可能在隐藏tab中），则不计算
            if (canvasWidth === 0) return;

            const canvasHeight = canvasWidth * videoHeight / videoWidth;
            this.canvas[0].width = canvasWidth;
            this.canvas[0].height = canvasHeight;
        }
    }

    play() {
        // 播放前强制刷新一次尺寸
        this.resize(); 
        
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.video[0].play();
        this.drawLoop();
    }

    pause() {
        this.video[0].pause();
        this.isPlaying = false;
    }

    playWhenReady() {
        const self = this;
        const video = self.video[0];

        // 检查视频是否已经可以播放 (readyState >= 3: HAVE_FUTURE_DATA)
        if (video.readyState >= 3) {
            self.play();
        } else {
            // 如果还没准备好，等待加载
            if (!self.loadedMetadataListener) {
                video.addEventListener('loadedmetadata', function() {
                    // 元数据加载完，必须Resize一次，否则高度是0
                    self.resize();
                });
                
                video.addEventListener('canplay', function () {
                   // 只有当此时元素依然可见时，才播放
                   // (防止加载太慢，用户已经切走了tab)
                   if(self.isPlaying === false) { // 简单检查
                        // 再次确认可见性比较麻烦，这里直接尝试播放，由Observer控制暂停
                        self.play();
                   }
                });
                self.loadedMetadataListener = true;
            }
        }
    }

    drawLoop() {
        const self = this;
        const video = this.video[0];
        const container = this.container;
        const context = this.context;

        // 如果停止播放，不再请求下一帧
        if (!this.isPlaying) return;
        
        requestAnimationFrame(() => self.drawLoop());

        // 安全检查：如果Canvas尺寸为0，不绘制
        if (this.canvas[0].width === 0 || this.canvas[0].height === 0) {
            self.resize(); // 尝试修复尺寸
            return;
        }

        const videoWidth = video.videoWidth / 2;
        const videoHeight = video.videoHeight;
        const canvasWidth = container.width();
        const canvasHeight = canvasWidth * videoHeight / videoWidth;
        const position = self.position;

        context.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvasWidth, canvasHeight);
        var colStart = (canvasWidth * position).clamp(0.0, canvasWidth);
        var colWidth = (canvasWidth - (canvasWidth * position)).clamp(0.0, canvasWidth);
        var sourceColStart = (videoWidth * position).clamp(0.0, videoWidth);
        var sourceColWidth = (videoWidth - (videoWidth * position)).clamp(0.0, videoWidth);
        
        context.drawImage(
            video,
            sourceColStart + videoWidth, 0,
            sourceColWidth, videoHeight,
            colStart, 0,
            colWidth, canvasHeight);

        // 绘制拖动条 UI (圆圈、箭头等)
        var arrowLength = 0.09 * canvasHeight;
        var arrowheadWidth = 0.025 * canvasHeight;
        var arrowheadLength = 0.04 * canvasHeight;
        var arrowPosY = canvasHeight / 10;
        var arrowWidth = 0.007 * canvasHeight;
        var currX = canvasWidth * position;

        // Draw circle
        context.arc(currX, arrowPosY, arrowLength * 0.7, 0, Math.PI * 2, false);
        context.fillStyle = "#FFD79340";
        context.fill()

        // Draw border
        context.beginPath();
        context.moveTo(canvasWidth * position, 0);
        context.lineTo(canvasWidth * position, canvasHeight);
        context.closePath()
        context.strokeStyle = "#AAAAAA";
        context.lineWidth = 5;
        context.stroke();

        // Draw arrow
        context.beginPath();
        context.moveTo(currX, arrowPosY - arrowWidth / 2);

        // Move right until meeting arrow head
        context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY - arrowWidth / 2);

        // Draw right arrow head
        context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY - arrowheadWidth / 2);
        context.lineTo(currX + arrowLength / 2, arrowPosY);
        context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY + arrowheadWidth / 2);
        context.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY + arrowWidth / 2);

        // Go back to the left until meeting left arrow head
        context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY + arrowWidth / 2);

        // Draw left arrow head
        context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY + arrowheadWidth / 2);
        context.lineTo(currX - arrowLength / 2, arrowPosY);
        context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY - arrowheadWidth / 2);
        context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY);

        context.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY - arrowWidth / 2);
        context.lineTo(currX, arrowPosY - arrowWidth / 2);

        context.closePath();

        context.fillStyle = "#AAAAAA";
        context.fill();

        // 绘制 Label 文字
        context.font = "30px 'Google Sans', sans-serif";
        context.fillStyle = "white";
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.textAlign = "left";
        context.textBaseline = "bottom";
        context.strokeText(self.label, 10, 35)
        context.fillText(self.label, 10, 35);

        context.textAlign = "right";
        context.strokeText(self.label2, canvasWidth - 10, 35)
        context.fillText(self.label2, canvasWidth - 10, 35);
    }
}
