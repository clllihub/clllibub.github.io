import { Expo, TimelineMax } from 'gsap'
import { each } from 'lodash'

import Page from 'classes/Page'

import { split, calculate } from 'utils/text'

import styles from './styles.scss'
import view from './view.pug'

export default class extends Page {
  constructor () {
    super({
      element: 'section',
      name: 'About',
      url: '/about'
    })

    const socials = [
      {
        label: 'Twitter',
        url: 'https://x.com/chi_shutterbug?s=21'
      },
      {
        label: 'Weibo',
        url: 'https://weibo.com/u/7925721621'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/clllihub'
      },
      {
        label: 'Bilibli',
        url: 'https://space.bilibili.com/295300559/video'
      },
      {
        label: 'Email',
        url: 'shutterbug.xiang@gmail.com'
      }
    ]

    this.element.className = `About ${styles.about}`
    this.element.innerHTML = view({
      title: 'Title',
      socials,
      styles
    })

    this.elements = {
      title: this.element.querySelector('.Title'),
      description: this.element.querySelectorAll('.Description'),
      descriptionSpans: [],
      social: this.element.querySelector('.Social')
    }

    this.setup()
  }

  setup () {
    each(this.elements.description, description => {
      const group = split({
        element: description,
        expression: ' '
      })

      group.forEach(element => {
        this.elements.descriptionSpans.push(element)
      })
    })
  }

  show () {
    const timeline = new TimelineMax()

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const { descriptionSpans, social, title } = this.elements

        const ease = Expo.easeOut
        const spans = calculate(descriptionSpans)

        timeline.set(this.element, {
          autoAlpha: 1
        })

        timeline.fromTo(title, 1.5, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          ease,
          y: 0
        })

        timeline.staggerFromTo(spans, 1.5, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          ease,
          y: 0
        }, 0.05, '-= 1.45')

        timeline.fromTo(social, 1.5, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          ease,
          y: 0
        }, '-= 1.45')
      })
    })

    return super.show(timeline)
  }

  hide () {
    const { descriptionSpans, social, title } = this.elements

    const timeline = new TimelineMax()

    const ease = Expo.easeOut
    const spans = calculate(descriptionSpans)

    timeline.to(title, 0.6, {
      autoAlpha: 0,
      ease,
      y: -50
    })

    timeline.staggerTo(spans, 0.6, {
      autoAlpha: 0,
      ease,
      y: -50
    }, 0.05, '-= 0.5')

    timeline.to(social, 0.6, {
      autoAlpha: 0,
      ease,
      y: -50
    }, '-= 0.5')

    timeline.set(this.element, {
      autoAlpha: 0
    })

    return super.hide(timeline)
  }
}
