import Vue from 'vue';
import 'vant/lib/index.css';
import { 
    Button,
    Toast, 
    Image as VanImage,
    NavBar,
    Col,
    Row,
    Icon,
    NumberKeyboard,
    Cell,
    CellGroup,
    Field,
    Dialog,
} from 'vant';

const arr = [
    Button,
    Toast,
    VanImage,
    NavBar,
    Col,
    Row,
    Icon,
    NumberKeyboard,
    Cell,
    CellGroup,
    Field,
    Dialog,
];

for (let i = 0; i < arr.length; i++) {
    Vue.use(arr[i], { size: 'small' });
}
  