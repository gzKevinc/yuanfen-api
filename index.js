const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ==================== 品种数据库（150种） ====================
const breeds = [
  // 🐕 犬类 - 大型犬
  { id: 'DOG001', type: 'dog', name: '金毛寻回犬', group: '大型犬', popularity: 95, size: 'large', coat: '长毛', origin: '英国', traits: ['友善', '忠诚', '聪明'] },
  { id: 'DOG002', type: 'dog', name: '拉布拉多寻回犬', group: '大型犬', popularity: 93, size: 'large', coat: '短毛', origin: '加拿大', traits: ['温顺', '活泼', '服从性强'] },
  { id: 'DOG003', type: 'dog', name: '德国牧羊犬', group: '大型犬', popularity: 90, size: 'large', coat: '中毛', origin: '德国', traits: ['聪明', '勇敢', '护主'] },
  { id: 'DOG004', type: 'dog', name: '边境牧羊犬', group: '大型犬', popularity: 88, size: 'large', coat: '中毛', origin: '英国', traits: ['极聪明', '活泼', '工作狂'] },
  { id: 'DOG005', type: 'dog', name: '哈士奇', group: '大型犬', popularity: 85, size: 'large', coat: '双层', origin: '西伯利亚', traits: ['友善', '调皮', '精力旺盛'] },
  { id: 'DOG006', type: 'dog', name: '萨摩耶', group: '大型犬', popularity: 82, size: 'large', coat: '厚毛', origin: '俄罗斯', traits: ['友善', '微笑天使', '活泼'] },
  { id: 'DOG007', type: 'dog', name: '阿拉斯加雪橇犬', group: '大型犬', popularity: 78, size: 'large', coat: '厚毛', origin: '美国', traits: ['忠诚', '独立', '耐寒'] },
  { id: 'DOG008', type: 'dog', name: '杜宾犬', group: '大型犬', popularity: 75, size: 'large', coat: '短毛', origin: '德国', traits: ['警觉', '护卫', '聪明'] },
  { id: 'DOG009', type: 'dog', name: '大丹犬', group: '大型犬', popularity: 65, size: 'large', coat: '短毛', origin: '德国', traits: ['温和', '勇敢', '服从'] },
  { id: 'DOG010', type: 'dog', name: '圣伯纳犬', group: '大型犬', popularity: 60, size: 'large', coat: '厚毛', origin: '瑞士', traits: ['温顺', '耐心', '救生'] },
  { id: 'DOG011', type: 'dog', name: '伯恩山犬', group: '大型犬', popularity: 62, size: 'large', coat: '中毛', origin: '瑞士', traits: ['温和', '忠诚', '耐心'] },
  { id: 'DOG012', type: 'dog', name: '纽芬兰犬', group: '大型犬', popularity: 58, size: 'large', coat: '厚毛', origin: '加拿大', traits: ['温柔', '游泳好', '救生'] },
  { id: 'DOG013', type: 'dog', name: '罗威纳犬', group: '大型犬', popularity: 70, size: 'large', coat: '短毛', origin: '德国', traits: ['护卫', '忠诚', '勇敢'] },
  { id: 'DOG014', type: 'dog', name: '秋田犬', group: '大型犬', popularity: 72, size: 'large', coat: '中毛', origin: '日本', traits: ['忠诚', '勇敢', '独立'] },
  { id: 'DOG015', type: 'dog', name: '柴犬', group: '中型犬', popularity: 88, size: 'medium', coat: '短毛', origin: '日本', traits: ['独立', '固执', '忠诚'] },
  { id: 'DOG016', type: 'dog', name: '松狮犬', group: '中型犬', popularity: 65, size: 'medium', coat: '厚毛', origin: '中国', traits: ['独立', '忠诚', '安静'] },
  { id: 'DOG017', type: 'dog', name: '斗牛犬', group: '中型犬', popularity: 75, size: 'medium', coat: '短毛', origin: '英国', traits: ['温和', '勇敢', '粘人'] },
  { id: 'DOG018', type: 'dog', name: '沙皮犬', group: '中型犬', popularity: 55, size: 'medium', coat: '短毛', origin: '中国', traits: ['独立', '护卫', '安静'] },
  { id: 'DOG019', type: 'dog', name: '巴哥犬', group: '小型犬', popularity: 70, size: 'small', coat: '短毛', origin: '中国', traits: ['友善', '粘人', '活泼'] },
  { id: 'DOG020', type: 'dog', name: '法斗', group: '小型犬', popularity: 85, size: 'small', coat: '短毛', origin: '法国', traits: ['友善', '调皮', '安静'] },
  // 🐕 犬类 - 中型犬
  { id: 'DOG021', type: 'dog', name: '柯基', group: '小型犬', popularity: 90, size: 'small', coat: '中毛', origin: '英国', traits: ['活泼', '聪明', '倔强'] },
  { id: 'DOG022', type: 'dog', name: '柴犬', group: '中型犬', popularity: 88, size: 'medium', coat: '短毛', origin: '日本', traits: ['独立', '固执', '忠诚'] },
  { id: 'DOG023', type: 'dog', name: '比格猎犬', group: '中型犬', popularity: 72, size: 'medium', coat: '短毛', origin: '英国', traits: ['活泼', '好奇', '友善'] },
  { id: 'DOG024', type: 'dog', name: '巴吉度猎犬', group: '中型犬', popularity: 55, size: 'medium', coat: '短毛', origin: '法国', traits: ['温和', '固执', '友善'] },
  { id: 'DOG025', type: 'dog', name: '威玛猎犬', group: '大型犬', popularity: 58, size: 'large', coat: '短毛', origin: '德国', traits: ['聪明', '活泼', '服从'] },
  { id: 'DOG026', type: 'dog', name: '斑点狗', group: '大型犬', popularity: 62, size: 'large', coat: '短毛', origin: '克罗地亚', traits: ['活泼', '友善', '敏感'] },
  { id: 'DOG027', type: 'dog', name: '爱尔兰雪达犬', group: '大型犬', popularity: 45, size: 'large', coat: '中毛', origin: '爱尔兰', traits: ['温和', '活泼', '忠诚'] },
  { id: 'DOG028', type: 'dog', name: '阿富汗猎犬', group: '大型犬', popularity: 40, size: 'large', coat: '长毛', origin: '阿富汗', traits: ['独立', '优雅', '固执'] },
  { id: 'DOG029', type: 'dog', name: '苏俄猎狼犬', group: '大型犬', popularity: 42, size: 'large', coat: '长毛', origin: '俄罗斯', traits: ['独立', '优雅', '追猎本能'] },
  { id: 'DOG030', type: 'dog', name: '万能梗', group: '中型犬', popularity: 50, size: 'medium', coat: '硬毛', origin: '英国', traits: ['勇敢', '服从', '活跃'] },
  { id: 'DOG031', type: 'dog', name: '苏格兰梗', group: '小型犬', popularity: 55, size: 'small', coat: '硬毛', origin: '苏格兰', traits: ['独立', '勇敢', '活泼'] },
  { id: 'DOG032', type: 'dog', name: '西高地白梗', group: '小型犬', popularity: 70, size: 'small', coat: '硬毛', origin: '苏格兰', traits: ['活泼', '勇敢', '固执'] },
  { id: 'DOG033', type: 'dog', name: '凯利蓝梗', group: '中型犬', popularity: 48, size: 'medium', coat: '卷毛', origin: '爱尔兰', traits: ['聪明', '活泼', '忠诚'] },
  { id: 'DOG034', type: 'dog', name: '软毛麦色梗', group: '中型犬', popularity: 52, size: 'medium', coat: '波浪毛', origin: '爱尔兰', traits: ['友善', '活泼', '聪明'] },
  { id: 'DOG035', type: 'dog', name: '爱尔兰梗', group: '中型犬', popularity: 45, size: 'medium', coat: '硬毛', origin: '爱尔兰', traits: ['勇敢', '活泼', '忠诚'] },
  // 🐕 更多常见犬种
  { id: 'DOG036', type: 'dog', name: '贵宾犬', group: '小型犬', popularity: 88, size: 'small', coat: '卷毛', origin: '法国', traits: ['聪明', '优雅', '不掉毛'] },
  { id: 'DOG037', type: 'dog', name: '比熊犬', group: '小型犬', popularity: 78, size: 'small', coat: '卷毛', origin: '法国', traits: ['友善', '活泼', '粘人'] },
  { id: 'DOG038', type: 'dog', name: '马尔济斯', group: '小型犬', popularity: 75, size: 'small', coat: '长毛', origin: '马耳他', traits: ['温柔', '粘人', '活泼'] },
  { id: 'DOG039', type: 'dog', name: '西施犬', group: '小型犬', popularity: 68, size: 'small', coat: '长毛', origin: '中国', traits: ['友善', '活泼', '粘人'] },
  { id: 'DOG040', type: 'dog', name: '北京犬', group: '小型犬', popularity: 60, size: 'small', coat: '长毛', origin: '中国', traits: ['傲慢', '忠诚', '安静'] },
  { id: 'DOG041', type: 'dog', name: '八哥犬', group: '小型犬', popularity: 72, size: 'small', coat: '短毛', origin: '中国', traits: ['友善', '安静', '粘人'] },
  { id: 'DOG042', type: 'dog', name: '吉娃娃', group: '超小型犬', popularity: 80, size: 'tiny', coat: '短毛/长毛', origin: '墨西哥', traits: ['警觉', '勇敢', '粘人'] },
  { id: 'DOG043', type: 'dog', name: '博美', group: '小型犬', popularity: 82, size: 'small', coat: '双层毛', origin: '德国', traits: ['活泼', '警觉', '聪明'] },
  { id: 'DOG044', type: 'dog', name: '约克夏梗', group: '小型犬', popularity: 78, size: 'small', coat: '长毛', origin: '英国', traits: ['勇敢', '固执', '粘人'] },
  { id: 'DOG045', type: 'dog', name: '腊肠犬', group: '小型犬', popularity: 75, size: 'small', coat: '短毛/长毛', origin: '德国', traits: ['好奇', '固执', '活泼'] },
  { id: 'DOG046', type: 'dog', name: '蝴蝶犬', group: '小型犬', popularity: 70, size: 'small', coat: '长毛', origin: '法国', traits: ['聪明', '活泼', '友善'] },
  { id: 'DOG047', type: 'dog', name: '巴哥犬', group: '小型犬', popularity: 72, size: 'small', coat: '短毛', origin: '中国', traits: ['友善', '安静', '粘人'] },
  { id: 'DOG048', type: 'dog', name: '骑士查理王小猎犬', group: '小型犬', popularity: 78, size: 'small', coat: '中毛', origin: '英国', traits: ['温柔', '友善', '活泼'] },
  { id: 'DOG049', type: 'dog', name: '法国斗牛犬', group: '小型犬', popularity: 90, size: 'small', coat: '短毛', origin: '法国', traits: ['友善', '调皮', '安静'] },
  { id: 'DOG050', type: 'dog', name: '英国斗牛犬', group: '中型犬', popularity: 72, size: 'medium', coat: '短毛', origin: '英国', traits: ['温和', '勇敢', '粘人'] },
  { id: 'DOG051', type: 'dog', name: '波士顿梗', group: '小型犬', popularity: 65, size: 'small', coat: '短毛', origin: '美国', traits: ['友善', '活泼', '聪明'] },
  { id: 'DOG052', type: 'dog', name: '拳师犬', group: '大型犬', popularity: 68, size: 'large', coat: '短毛', origin: '德国', traits: ['忠诚', '活泼', '护卫'] },
  { id: 'DOG053', type: 'dog', name: '牛头梗', group: '中型犬', popularity: 62, size: 'medium', coat: '短毛', origin: '英国', traits: ['勇敢', '活泼', '粘人'] },
  { id: 'DOG054', type: 'dog', name: '斯塔福郡斗牛梗', group: '中型犬', popularity: 58, size: 'medium', coat: '短毛', origin: '英国', traits: ['勇敢', '忠诚', '友好'] },
  { id: 'DOG055', type: 'dog', name: '美国斯塔福郡梗', group: '中型犬', popularity: 60, size: 'medium', coat: '短毛', origin: '美国', traits: ['勇敢', '忠诚', '服从'] },
  { id: 'DOG056', type: 'dog', name: '惠比特', group: '中型犬', popularity: 58, size: 'medium', coat: '短毛', origin: '英国', traits: ['安静', '温柔', '速度快'] },
  { id: 'DOG057', type: 'dog', name: '意大利灵缇', group: '小型犬', popularity: 55, size: 'small', coat: '短毛', origin: '意大利', traits: ['安静', '温柔', '敏感'] },
  { id: 'DOG058', type: 'dog', name: '中国冠毛犬', group: '小型犬', popularity: 45, size: 'small', coat: '无毛', origin: '中国', traits: ['活泼', '敏感', '粘人'] },
  { id: 'DOG059', type: 'dog', name: '墨西哥无毛犬', group: '中型犬', popularity: 40, size: 'medium', coat: '无毛', origin: '墨西哥', traits: ['温顺', '安静', '忠诚'] },
  { id: 'DOG060', type: 'dog', name: '日本仲', group: '小型犬', popularity: 50, size: 'small', coat: '长毛', origin: '日本', traits: ['活泼', '警觉', '独立'] },
  { id: 'DOG061', type: 'dog', name: '日本狐狸犬', group: '中型犬', popularity: 55, size: 'medium', coat: '厚毛', origin: '日本', traits: ['独立', '警觉', '活泼'] },
  { id: 'DOG062', type: 'dog', name: '芬兰狐狸犬', group: '中型犬', popularity: 48, size: 'medium', coat: '中毛', origin: '芬兰', traits: ['活泼', '独立', '友善'] },
  { id: 'DOG063', type: 'dog', name: '挪威伦德猎犬', group: '中型犬', popularity: 35, size: 'medium', coat: '中毛', origin: '挪威', traits: ['聪明', '独立', '警觉'] },
  { id: 'DOG064', type: 'dog', name: '瑞典瓦汉德犬', group: '大型犬', popularity: 38, size: 'large', coat: '中毛', origin: '瑞典', traits: ['独立', '勇敢', '护卫'] },
  { id: 'DOG065', type: 'dog', name: '芬兰尖嘴犬', group: '中型犬', popularity: 42, size: 'medium', coat: '厚毛', origin: '芬兰', traits: ['活泼', '独立', '友善'] },
  { id: 'DOG066', type: 'dog', name: '西伯利亚雪橇犬', group: '大型犬', popularity: 85, size: 'large', coat: '双层', origin: '俄罗斯', traits: ['友善', '调皮', '精力旺盛'] },
  { id: 'DOG067', type: 'dog', name: '格陵兰犬', group: '大型犬', popularity: 35, size: 'large', coat: '厚毛', origin: '格陵兰', traits: ['独立', '强壮', '耐寒'] },
  { id: 'DOG068', type: 'dog', name: '萨路基猎犬', group: '大型犬', popularity: 40, size: 'large', coat: '短毛/羽毛', origin: '中东', traits: ['独立', '优雅', '追猎本能'] },
  { id: 'DOG069', type: 'dog', name: '爱尔兰红白蹲猎犬', group: '大型犬', popularity: 38, size: 'large', coat: '短毛', origin: '爱尔兰', traits: ['活跃', '友善', '服从'] },
  { id: 'DOG070', type: 'dog', name: '英国蹲猎犬', group: '大型犬', popularity: 42, size: 'large', coat: '短毛', origin: '英国', traits: ['温和', '活泼', '服从'] },
  { id: 'DOG071', type: 'dog', name: '布列塔尼猎犬', group: '中型犬', popularity: 45, size: 'medium', coat: '中毛', origin: '法国', traits: ['活泼', '聪明', '服从'] },
  { id: 'DOG072', type: 'dog', name: '德国短毛指示猎犬', group: '大型犬', popularity: 48, size: 'large', coat: '短毛', origin: '德国', traits: ['聪明', '活跃', '服从'] },
  { id: 'DOG073', type: 'dog', name: '德国硬毛指示猎犬', group: '大型犬', popularity: 45, size: 'large', coat: '硬毛', origin: '德国', traits: ['聪明', '勇敢', '服从'] },
  { id: 'DOG074', type: 'dog', name: '维兹拉猎犬', group: '大型犬', popularity: 42, size: 'large', coat: '短毛', origin: '匈牙利', traits: ['活泼', '忠诚', '服从'] },
  { id: 'DOG075', type: 'dog', name: '匈牙利维兹拉犬', group: '大型犬', popularity: 40, size: 'large', coat: '短毛', origin: '匈牙利', traits: ['活泼', '忠诚', '聪明'] },
  { id: 'DOG076', type: 'dog', name: '魏玛猎犬', group: '大型犬', popularity: 50, size: 'large', coat: '短毛', origin: '德国', traits: ['聪明', '活泼', '服从'] },
  { id: 'DOG077', type: 'dog', name: '英国可卡犬', group: '中型犬', popularity: 55, size: 'medium', coat: '中毛', origin: '英国', traits: ['温和', '活泼', '服从'] },
  { id: 'DOG078', type: 'dog', name: '美国可卡犬', group: '中型犬', popularity: 58, size: 'medium', coat: '中毛', origin: '美国', traits: ['友善', '活泼', '粘人'] },
  { id: 'DOG079', type: 'dog', name: '英国史宾格犬', group: '中型犬', popularity: 52, size: 'medium', coat: '中毛', origin: '英国', traits: ['活泼', '聪明', '服从'] },
  { id: 'DOG080', type: 'dog', name: '爱尔兰水猎犬', group: '中型犬', popularity: 40, size: 'medium', coat: '卷毛', origin: '爱尔兰', traits: ['聪明', '活泼', '工作狂'] },
  { id: 'DOG081', type: 'dog', name: '葡萄牙水犬', group: '中型犬', popularity: 45, size: 'medium', coat: '卷毛', origin: '葡萄牙', traits: ['聪明', '活泼', '忠诚'] },
  { id: 'DOG082', type: 'dog', name: '西班牙水犬', group: '中型犬', popularity: 38, size: 'medium', coat: '卷毛', origin: '西班牙', traits: ['活跃', '聪明', '独立'] },
  { id: 'DOG083', type: 'dog', name: '标准贵妇犬', group: '中型犬', popularity: 65, size: 'medium', coat: '卷毛', origin: '法国', traits: ['聪明', '优雅', '不掉毛'] },
  { id: 'DOG084', type: 'dog', name: '巨型贵妇犬', group: '大型犬', popularity: 55, size: 'large', coat: '卷毛', origin: '法国', traits: ['聪明', '优雅', '不掉毛'] },
  { id: 'DOG085', type: 'dog', name: '迷你贵妇犬', group: '小型犬', popularity: 72, size: 'small', coat: '卷毛', origin: '法国', traits: ['聪明', '活泼', '不掉毛'] },
  { id: 'DOG086', type: 'dog', name: '贝灵顿梗', group: '小型犬', popularity: 58, size: 'small', coat: '卷毛', origin: '英国', traits: ['活泼', '勇敢', '独立'] },
  { id: 'DOG087', type: 'dog', name: '丹迪丁蒙梗', group: '小型犬', popularity: 42, size: 'small', coat: '硬毛', origin: '苏格兰', traits: ['独立', '固执', '勇敢'] },
  { id: 'DOG088', type: 'dog', name: '斯凯梗', group: '小型犬', popularity: 38, size: 'small', coat: '长毛', origin: '苏格兰', traits: ['独立', '勇敢', '安静'] },
  { id: 'DOG089', type: 'dog', name: '西里汉梗', group: '小型犬', popularity: 45, size: 'small', coat: '无底毛', origin: '威尔士', traits: ['活泼', '勇敢', '粘人'] },
  { id: 'DOG090', type: 'dog', name: '诺福克梗', group: '小型犬', popularity: 50, size: 'small', coat: '硬毛', origin: '英国', traits: ['活泼', '勇敢', '友善'] },
  { id: 'DOG091', type: 'dog', name: '诺维奇梗', group: '小型犬', popularity: 48, size: 'small', coat: '硬毛', origin: '英国', traits: ['活泼', '聪明', '友善'] },
  { id: 'DOG092', type: 'dog', name: '波士顿梗', group: '小型犬', popularity: 65, size: 'small', coat: '短毛', origin: '美国', traits: ['友善', '活泼', '聪明'] },
  { id: 'DOG093', type: 'dog', name: '曼彻斯特梗', group: '小型犬', popularity: 50, size: 'small', coat: '短毛', origin: '英国', traits: ['警觉', '聪明', '活泼'] },
  { id: 'DOG094', type: 'dog', name: '迷你杜宾犬', group: '小型犬', popularity: 68, size: 'small', coat: '短毛', origin: '德国', traits: ['警觉', '勇敢', '聪明'] },
  { id: 'DOG095', type: 'dog', name: '吉娃娃', group: '超小型犬', popularity: 85, size: 'tiny', coat: '短毛/长毛', origin: '墨西哥', traits: ['警觉', '勇敢', '粘人'] },
  { id: 'DOG096', type: 'dog', name: '中国冠毛犬', group: '小型犬', popularity: 45, size: 'small', coat: '无毛', origin: '中国', traits: ['活泼', '敏感', '粘人'] },
  { id: 'DOG097', type: 'dog', name: '玩具贵宾犬', group: '超小型犬', popularity: 78, size: 'tiny', coat: '卷毛', origin: '法国', traits: ['聪明', '活泼', '粘人'] },
  { id: 'DOG098', type: 'dog', name: '哈瓦那犬', group: '小型犬', popularity: 55, size: 'small', coat: '长毛', origin: '古巴', traits: ['友善', '聪明', '活泼'] },
  { id: 'DOG099', type: 'dog', name: '博洛尼亚犬', group: '小型犬', popularity: 48, size: 'small', coat: '卷毛', origin: '意大利', traits: ['安静', '粘人', '温顺'] },
  { id: 'DOG100', type: 'dog', name: '拉萨犬', group: '小型犬', popularity: 58, size: 'small', coat: '长毛', origin: '中国', traits: ['独立', '警觉', '固执'] },
  // 🐱 猫类
  { id: 'CAT001', type: 'cat', name: '英国短毛猫', group: '短毛猫', popularity: 92, size: 'medium', coat: '短毛', origin: '英国', traits: ['安静', '温顺', '适应力强'] },
  { id: 'CAT002', type: 'cat', name: '美国短毛猫', group: '短毛猫', popularity: 88, size: 'medium', coat: '短毛', origin: '美国', traits: ['健康', '友好', '活泼'] },
  { id: 'CAT003', type: 'cat', name: '波斯猫', group: '长毛猫', popularity: 82, size: 'medium', coat: '长毛', origin: '伊朗', traits: ['安静', '温顺', '优雅'] },
  { id: 'CAT004', type: 'cat', name: '暹罗猫', group: '短毛猫', popularity: 85, size: 'medium', coat: '短毛', origin: '泰国', traits: ['聪明', '粘人', '话多'] },
  { id: 'CAT005', type: 'cat', name: '布偶猫', group: '长毛猫', popularity: 90, size: 'large', coat: '中毛', origin: '美国', traits: ['温顺', '粘人', '安静'] },
  { id: 'CAT006', type: 'cat', name: '缅因猫', group: '长毛猫', popularity: 82, size: 'large', coat: '长毛', origin: '美国', traits: ['温柔', '聪明', '独立'] },
  { id: 'CAT007', type: 'cat', name: '苏格兰折耳猫', group: '短毛猫', popularity: 78, size: 'medium', coat: '短毛', origin: '苏格兰', traits: ['温和', '安静', '粘人'] },
  { id: 'CAT008', type: 'cat', name: '俄罗斯蓝猫', group: '短毛猫', popularity: 75, size: 'medium', coat: '短毛', origin: '俄罗斯', traits: ['安静', '害羞', '忠诚'] },
  { id: 'CAT009', type: 'cat', name: '孟加拉猫', group: '短毛猫', popularity: 72, size: 'medium', coat: '短毛', origin: '美国', traits: ['活泼', '好奇', '聪明'] },
  { id: 'CAT010', type: 'cat', name: '阿比西尼亚猫', group: '短毛猫', popularity: 68, size: 'medium', coat: '短毛', origin: '埃塞俄比亚', traits: ['活泼', '好奇', '聪明'] },
  { id: 'CAT011', type: 'cat', name: '异国短毛猫', group: '短毛猫', popularity: 80, size: 'medium', coat: '短毛', origin: '美国', traits: ['安静', '温顺', '粘人'] },
  { id: 'CAT012', type: 'cat', name: '英国蓝猫', group: '短毛猫', popularity: 78, size: 'medium', coat: '短毛', origin: '英国', traits: ['安静', '温和', '适应力强'] },
  { id: 'CAT013', type: 'cat', name: '金吉拉', group: '长毛猫', popularity: 75, size: 'medium', coat: '长毛', origin: '英国', traits: ['温顺', '安静', '优雅'] },
  { id: 'CAT014', type: 'cat', name: '挪威森林猫', group: '长毛猫', popularity: 70, size: 'large', coat: '长毛', origin: '挪威', traits: ['独立', '聪明', '活泼'] },
  { id: 'CAT015', type: 'cat', name: '土耳其安哥拉猫', group: '长毛猫', popularity: 58, size: 'medium', coat: '长毛', origin: '土耳其', traits: ['活泼', '聪明', '社交'] },
  { id: 'CAT016', type: 'cat', name: '土耳其梵猫', group: '长毛猫', popularity: 52, size: 'medium', coat: '长毛', origin: '土耳其', traits: ['活泼', '好奇', '爱玩水'] },
  { id: 'CAT017', type: 'cat', name: '埃及猫', group: '短毛猫', popularity: 55, size: 'medium', coat: '短毛', origin: '埃及', traits: ['聪明', '活泼', '忠诚'] },
  { id: 'CAT018', type: 'cat', name: '奥西猫', group: '短毛猫', popularity: 50, size: 'medium', coat: '短毛', origin: '美国', traits: ['活泼', '好奇', '社交'] },
  { id: 'CAT019', type: 'cat', name: '索马里猫', group: '长毛猫', popularity: 48, size: 'medium', coat: '长毛', origin: '索马里', traits: ['活泼', '好奇', '聪明'] },
  { id: 'CAT020', type: 'cat', name: '巴厘猫', group: '长毛猫', popularity: 60, size: 'medium', coat: '长毛', origin: '美国', traits: ['活泼', '聪明', '粘人'] },
  { id: 'CAT021', type: 'cat', name: '喜马拉雅猫', group: '长毛猫', popularity: 65, size: 'medium', coat: '长毛', origin: '美国', traits: ['温顺', '安静', '粘人'] },
  { id: 'CAT022', type: 'cat', name: '新加坡猫', group: '短毛猫', popularity: 42, size: 'small', coat: '短毛', origin: '新加坡', traits: ['好奇', '活泼', '粘人'] },
  { id: 'CAT023', type: 'cat', name: '柯拉特猫', group: '短毛猫', popularity: 45, size: 'medium', coat: '短毛', origin: '泰国', traits: ['聪明', '好奇', '社交'] },
  { id: 'CAT024', type: 'cat', name: '日本短尾猫', group: '短毛猫', popularity: 55, size: 'medium', coat: '短毛', origin: '日本', traits: ['活泼', '聪明', '爱玩水'] },
  { id: 'CAT025', type: 'cat', name: '美国卷耳猫', group: '短毛猫', popularity: 58, size: 'medium', coat: '中毛', origin: '美国', traits: ['活泼', '好奇', '友好'] },
  { id: 'CAT026', type: 'cat', name: '苏格兰折耳猫', group: '短毛猫', popularity: 78, size: 'medium', coat: '短毛', origin: '苏格兰', traits: ['温和', '安静', '粘人'] },
  { id: 'CAT027', type: 'cat', name: '塞尔凯克卷毛猫', group: '短毛猫', popularity: 52, size: 'medium', coat: '卷毛', origin: '美国', traits: ['温顺', '活泼', '友好'] },
  { id: 'CAT028', type: 'cat', name: '德文卷毛猫', group: '短毛猫', popularity: 65, size: 'medium', coat: '卷毛', origin: '英国', traits: ['活泼', '好奇', '粘人'] },
  { id: 'CAT029', type: 'cat', name: '康沃尔卷毛猫', group: '短毛猫', popularity: 55, size: 'medium', coat: '卷毛', origin: '英国', traits: ['活泼', '好奇', '聪明'] },
  { id: 'CAT030', type: 'cat', name: '缅甸猫', group: '短毛猫', popularity: 62, size: 'medium', coat: '短毛', origin: '缅甸', traits: ['活泼', '好奇', '社交'] },
  { id: 'CAT031', type: 'cat', name: '孟买猫', group: '短毛猫', popularity: 58, size: 'medium', coat: '短毛', origin: '美国', traits: ['活泼', '好奇', '粘人'] },
  { id: 'CAT032', type: 'cat', name: '伯曼猫', group: '长毛猫', popularity: 68, size: 'large', coat: '长毛', origin: '缅甸', traits: ['温顺', '安静', '粘人'] },
  { id: 'CAT033', type: 'cat', name: '西伯利亚猫', group: '长毛猫', popularity: 60, size: 'large', coat: '长毛', origin: '俄罗斯', traits: ['温顺', '聪明', '适应力强'] },
  { id: 'CAT034', type: 'cat', name: '曼岛无尾猫', group: '短毛猫', popularity: 55, size: 'medium', coat: '短毛', origin: '英国', traits: ['活泼', '聪明', '友好'] },
  { id: 'CAT035', type: 'cat', name: '日本无尾猫', group: '短毛猫', popularity: 50, size: 'medium', coat: '短毛', origin: '日本', traits: ['活泼', '聪明', '友好'] },
  { id: 'CAT036', type: 'cat', name: '褴褛猫', group: '长毛猫', popularity: 45, size: 'large', coat: '长毛', origin: '美国', traits: ['温顺', '安静', '粘人'] },
  { id: 'CAT037', type: 'cat', name: '美国硬毛猫', group: '短毛猫', popularity: 40, size: 'medium', coat: '卷毛', origin: '美国', traits: ['活泼', '好奇', '友好'] },
  { id: 'CAT038', type: 'cat', name: '英国长毛猫', group: '长毛猫', popularity: 65, size: 'large', coat: '长毛', origin: '英国', traits: ['安静', '温和', '适应力强'] },
  { id: 'CAT039', type: 'cat', name: '欧洲短毛猫', group: '短毛猫', popularity: 55, size: 'medium', coat: '短毛', origin: '欧洲', traits: ['健康', '友好', '独立'] },
  { id: 'CAT040', type: 'cat', name: '波米拉猫', group: '短毛猫', popularity: 48, size: 'medium', coat: '短毛', origin: '英国', traits: ['活泼', '友好', '好奇'] },
  { id: 'CAT041', type: 'cat', name: '热带草原猫', group: '短毛猫', popularity: 42, size: 'large', coat: '短毛', origin: '美国', traits: ['活泼', '好奇', '聪明'] },
  { id: 'CAT042', type: 'cat', name: '玩具虎猫', group: '短毛猫', popularity: 40, size: 'medium', coat: '短毛', origin: '美国', traits: ['活泼', '好奇', '友好'] },
  { id: 'CAT043', type: 'cat', name: '狼猫', group: '短毛猫', popularity: 38, size: 'medium', coat: '卷毛', origin: '美国', traits: ['活泼', '好奇', '粘人'] },
  { id: 'CAT044', type: 'cat', name: '肯尼亚猫', group: '短毛猫', popularity: 35, size: 'medium', coat: '短毛', origin: '美国', traits: ['活泼', '好奇', '社交'] },
  { id: 'CAT045', type: 'cat', name: '萨凡纳猫', group: '短毛猫', popularity: 45, size: 'large', coat: '短毛', origin: '美国', traits: ['活泼', '好奇', '聪明'] },
  { id: 'CAT046', type: 'cat', name: '乌尔肯猫', group: '短毛猫', popularity: 30, size: 'medium', coat: '卷毛', origin: '俄罗斯', traits: ['活泼', '好奇', '友好'] },
  { id: 'CAT047', type: 'cat', name: '日本狮子猫', group: '长毛猫', popularity: 42, size: 'medium', coat: '长毛', origin: '日本', traits: ['活泼', '聪明', '友好'] },
  { id: 'CAT048', type: 'cat', name: '缅甸圣猫', group: '短毛猫', popularity: 38, size: 'medium', coat: '短毛', origin: '美国', traits: ['温顺', '安静', '粘人'] },
  { id: 'CAT049', type: 'cat', name: '新加坡猫', group: '短毛猫', popularity: 42, size: 'small', coat: '短毛', origin: '新加坡', traits: ['好奇', '活泼', '粘人'] },
  { id: 'CAT050', type: 'cat', name: '东方短毛猫', group: '短毛猫', popularity: 58, size: 'medium', coat: '短毛', origin: '英国', traits: ['活泼', '好奇', '粘人'] }
];

// 随机性格数据生成
function generatePersonality() {
  return {
    friendly: Math.floor(Math.random() * 20) + 80,
    energetic: Math.floor(Math.random() * 30) + 60,
    loyal: Math.floor(Math.random() * 20) + 80,
    smart: Math.floor(Math.random() * 25) + 75
  };
}

// ==================== API 路由 ====================

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), version: '1.0.0' });
});

// 统计接口
app.get('/api/stats', (req, res) => {
  res.json({
    totalAnalyses: 12847,
    todayAnalyses: 156,
    totalUsers: 8932
  });
});

// 获取所有品种
app.get('/api/breeds', (req, res) => {
  const type = req.query.type;
  const filtered = type ? breeds.filter(b => b.type === type) : breeds;
  res.json({
    total: filtered.length,
    breeds: filtered.map(b => ({
      id: b.id,
      type: b.type,
      name: b.name,
      group: b.group,
      popularity: b.popularity
    }))
  });
});

// 获取品种详情
app.get('/api/breeds/:id', (req, res) => {
  const breed = breeds.find(b => b.id === req.params.id);
  if (!breed) {
    return res.status(404).json({ error: '品种不存在' });
  }
  res.json(breed);
});

// 品种推荐
app.post('/api/breeds/recommend', (req, res) => {
  const { lifestyle, hasKids, hasPet, space } = req.body;
  // 简化推荐逻辑
  let recommended = breeds.filter(b => b.popularity > 70);
  if (hasKids) recommended = recommended.filter(b => b.traits.includes('友善') || b.traits.includes('温顺'));
  if (space === 'small') recommended = recommended.filter(b => b.size === 'small' || b.size === 'tiny');
  
  res.json({
    recommended: recommended.slice(0, 6),
    reason: '根据您的生活方式推荐'
  });
});

// 图片分析（Mock）
// ==================== 百度宠物识别 API 配置 ====================
const BAIDU_API_KEY = process.env.BAIDU_API_KEY || 'QN4Fk5eOfgGwjTQ9HdOs9lBj';
const BAIDU_SECRET_KEY = process.env.BAIDU_SECRET_KEY || 'ooAIc2OyGnKni8mpUm8nyFEDkyPlJuLV';
let baiduAccessToken = null;
let baiduTokenExpireTime = 0;

// 获取百度 Access Token（带缓存，24小时有效）
async function getBaiduAccessToken() {
  if (baiduAccessToken && Date.now() < baiduTokenExpireTime) {
    return baiduAccessToken;
  }
  
  try {
    const response = await fetch(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_API_KEY}&client_secret=${BAIDU_SECRET_KEY}`,
      { method: 'POST' }
    );
    const data = await response.json();
    
    if (data.access_token) {
      baiduAccessToken = data.access_token;
      // 提前5分钟过期，避免边界问题
      baiduTokenExpireTime = Date.now() + (data.expires_in - 300) * 1000;
      return baiduAccessToken;
    } else {
      console.error('百度Token获取失败:', data);
      return null;
    }
  } catch (error) {
    console.error('百度API请求异常:', error);
    return null;
  }
}

// 百度品种名 → 内部品种ID 映射（模糊匹配）
function matchBreedByName(baiduName) {
  // 精确匹配
  let found = breeds.find(b => b.name === baiduName);
  if (found) return found;
  
  // 模糊匹配（包含关系）
  found = breeds.find(b => b.name.includes(baiduName) || baiduName.includes(b.name));
  if (found) return found;
  
  // 关键词匹配
  const keywords = {
    '金毛': '金毛寻回犬', '拉布拉多': '拉布拉多寻回犬', '德牧': '德国牧羊犬',
    '边牧': '边境牧羊犬', '哈士奇': '哈士奇', '萨摩': '萨摩耶',
    '阿拉斯加': '阿拉斯加雪橇犬', '柴犬': '柴犬', '柯基': '柯基',
    '法斗': '法斗', '斗牛': '斗牛犬', '巴哥': '巴哥犬',
    '贵宾': '贵宾犬', '泰迪': '贵宾犬', '比熊': '比熊犬',
    '博美': '博美犬', '雪纳瑞': '雪纳瑞犬', '吉娃娃': '吉娃娃',
    '英短': '英国短毛猫', '美短': '美国短毛猫', '布偶': '布偶猫',
    '橘猫': '橘猫(中华田园猫)', '狸花': '狸花猫(中华田园猫)',
    '波斯': '波斯猫', '暹罗': '暹罗猫', '缅因': '缅因库恩猫'
  };
  
  for (const [key, name] of Object.entries(keywords)) {
    if (baiduName.includes(key)) {
      return breeds.find(b => b.name === name);
    }
  }
  
  // 默认返回最接近的随机品种（按类型）
  const isCat = baiduName.includes('猫');
  const candidates = breeds.filter(b => b.type === (isCat ? 'cat' : 'dog'));
  return candidates[Math.floor(Math.random() * candidates.length)] || breeds[0];
}

// 图片分析（接入百度宠物识别 API）
app.post('/api/analyze', async (req, res) => {
  const { image } = req.body;  // image: base64 或 URL
  
  if (!image) {
    return res.status(400).json({ success: false, error: '请上传图片' });
  }
  
  try {
    // 1. 获取百度 Token
    const token = await getBaiduAccessToken();
    if (!token) {
      throw new Error('百度API认证失败，请稍后重试');
    }
    
    // 2. 调用百度动物识别 API
    const apiUrl = `https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token=${token}`;
    
    let imageData;
    let isBase64 = false;
    
    if (image.startsWith('http://') || image.startsWith('https://')) {
      imageData = { url: image };
    } else {
      // 去掉 base64 前缀
      const base64Data = image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
      imageData = { image: base64Data };
      isBase64 = true;
    }
    
    const formData = new URLSearchParams();
    if (isBase64) {
      formData.append('image', imageData.image);
    } else {
      formData.append('url', imageData.url);
    }
    formData.append('top_num', '3');  // 返回Top3结果
    
    const baiduResponse = await fetch(apiUrl, {
      method: 'POST',
      body: formData.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    const baiduResult = await baiduResponse.json();
    
    if (baiduResult.error_code) {
      throw new Error(`百度识别失败: ${baiduResult.error_msg || baiduResult.error_code}`);
    }
    
    // 3. 匹配内部品种数据库
    const topResult = baiduResult.result?.[0];
    if (!topResult) {
      throw new Error('未能识别出宠物品种，请换一张清晰的照片试试');
    }
    
    const matchedBreed = matchBreedByName(topResult.name);
    const personality = generatePersonality();
    
    res.json({
      success: true,
      breed: matchedBreed,
      rawResult: {
        name: topResult.name,
        score: parseFloat(topResult.score),
        allResults: baiduResult.result.map(r => ({ name: r.name, score: parseFloat(r.score) }))
      },
      confidence: Math.round(parseFloat(topResult.score) * 100),
      personality,
      tips: [
        `这种${matchedBreed.name}需要每天${matchedBreed.coat.includes('长毛') ? '梳理毛发' : '适度运动'}`,
        `建议每天喂食${matchedBreed.size === 'large' ? '2-3次' : '1-2次'}`,
        `${matchedBreed.traits[0]}是它们的天性特点`
      ]
    });
    
  } catch (error) {
    console.error('/api/analyze 错误:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || '分析失败，请稍后重试'
    });
  }
});

// 生成报告（Mock）
app.post('/api/report', (req, res) => {
  const { breed, personality, userId } = req.body;
  
  const reportId = 'RPT' + Date.now();
  
  res.json({
    success: true,
    reportId,
    preview: `您与${breed?.name || '宠物'}的缘分报告已生成`,
    unlocked: false,
    price: 9.9
  });
});

// Vercel serverless handler
module.exports = app;