 <template>
  <ul class="sidenav app-sidenav" :class="{open: show}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      tag="li"
      active-class="active"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  // name:"side-bar-layout",
  props:[
      'show'
    ],
  data :() => ({
    links:[
       {title:"Счет",url:"/",exact:true},
       {title:"История",url:"/history",exact:false},
       {title:"Оплаты",url:"/paymants",exact:false},
       {title:"Планирование",url:"/planning",exact:false},
       {title:"Новая запись",url:"/records",exact:false},
       {title:"Категории",url:"/categories",exact:false},
       {title:"Типы карточек",url:"/cardTypes",exact:false},
       {title:"Типы полей",url:"/cardFields",exact:false}
    ]
     
  })
}
</script>
 