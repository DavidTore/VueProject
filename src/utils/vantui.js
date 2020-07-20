import Vue from 'vue';
import 'vant/lib/index.css';
import { 
    Button,
    Toast, 
    Dialog,
    Image as VanImage,
    NavBar,
    Col,
    Row,
    Icon,
    NumberKeyboard,
} from 'vant';

const arr = [
    Button,
    Toast,
    Dialog,
    VanImage,
    NavBar,
    Col,
    Row,
    Icon,
    NumberKeyboard,
];

for (let i = 0; i < arr.length; i++) {
    Vue.use(arr[i], { size: 'small' });
}
  