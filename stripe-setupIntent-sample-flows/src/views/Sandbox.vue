  <template>
    <div>
    <div class="skewed-bg 
    rounded-xl
    w-full h-[300px] relative
    bg-gradient-to-r from-slate-200 from-0% 
          via-red-500 via-50% to-slat-200 to-100%
    before:absolute before:top-0 before:left-[50%] 
    before:content-['']
    before:skew-x-[-20deg] before:w-[1px] before:h-full
    before:bg-slate-200"></div>

    </div>
  </template>
  
  <style  scoped>
    .skewed-bg {
    background: linear-gradient(145deg, #6B7280 0%, #EF4444 50%, #6B7280 100%);
  }


  </style>