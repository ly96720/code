import service from '@/utils/service'
export const getData1 = (cityId, type, page) => {
  return service.get('/gateway', {
    params: {
      cityId: cityId,
      pageNum: page,
      pageSize: 10,
      type: type,
      k: Date.now()
    },
    data: {
      'X-Host': 'mall.film-ticket.film.list'
    }
  })
}
export const getData2 = (id) => {
  return service.get(`/gateway?filmId=${id}`, {
    data: {
      'X-Host': 'mall.film-ticket.film.info'
    }
  })
}
export const getData4 = () => {
  return service.get(`/gateway?type=2&cityId=210100`, {
    data: {
      'X-Host': 'mall.cfg.common-banner'
    }
  })
}
export const getcity = () => {
  return service.get(`/gateway?${Date.now()}`, {
    data: {
      'X-Host': 'mall.film-ticket.city.list'
    }
  })
}
export const getcinema = (cityId, cinemaIds) => {
  return service.post(`/gateway?${Date.now()}`,
    JSON.stringify({
      cityId,
      cinemaIds
    }), {
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"15785675932160368550269","bc":"310100"}`,
        'X-Host': 'mall.film-ticket.cinema.batch-cinema'
      }
    })
}

export const getCinema = (filmId, cityId) => {
  return service.get(`/gateway/?filmId=${filmId}&cityId=${cityId}`, {
    data: {
      'X-Host': 'mall.film-ticket.cinema.film-show-cinema'
    }
  })
}
export const getNews = () => {
  return service.get(`/gateway?actId=ElzMZU125260`, {
    data: {
      'X-Host': 'mall.act.static-page.info'
    }
  })
}

export const getCinemaDirect = (cityId) => {
  return service.get(`/gateway?cityId=${cityId}&ticketFlag=1&k=7168930`, {
    data: {
      'X-Host': 'mall.film-ticket.cinema.list'
    }
  })
}
export const getMoive = (cinemaId) => {
  return service.get(`/gateway/?cinemaId=${cinemaId}&k=296742`, {
    data: {
      'X-Host': 'mall.film-ticket.film.cinema-show-film'
    }
  })
}
// 获取影院，买票时的
export const getDyy = (filmId, cinemaId, date) => {
  return service.get(`/gateway/?filmId=${filmId}&cinemaId=${cinemaId}&date=${date}&k=5721839`, {
    data: {
      'X-Host': 'mall.film-ticket.schedule.list'
    }
  })
}
// 发送验证码
export const getSendCode = (mobile) => {
  return service.post(`/gateway`,
    JSON.stringify({
      imgCode: '',
      imgKey: '',
      mobile,
      type: '1'
    })
    ,
    {
      headers: {
        'X-Host': 'mall.user.sms-code.send'
      }
    }
  )
}
// 检验验证码
export const getCheckCode = (mobile, smsCode) => {
  return service.post(`/gateway`,
    JSON.stringify({
      extra: {},
      imgCode: '',
      imgKey: '',
      mobile,
      smsCode
    })
    ,
    {
      headers: {
        'X-Host': 'mall.user.sms-code-login'
      }
    }
  )
}
// 获取影院，通过区县
export const getCityByDistrict = (cityId) => {
  return service.get(`/gateway?cityId=${cityId}&ticketFlag=1&k=5832645`, {
    data: {
      'X-Host': 'mall.film-ticket.cinema.list'
    }
  })
}

// 获取电影院信息  选座的时候
export const getMoInBuyTiket = (scheduleId) => {
  return service.get(`/gateway/?scheduleId=${scheduleId}&k=5018294`, {
    data: {
      'X-Host': 'mall.film-ticket.schedule.info'
    }
  })
}
// 获取座位信息
export const getSeat = (scheduleId) => {
  return service.get(`/gateway/?scheduleId=${scheduleId}&k=7544943`, {
    data: {
      'X-Host': 'mall.film-ticket.seat.list'
    }
  })
}
// 44130957
