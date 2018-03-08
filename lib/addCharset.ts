import IDocument from './interfaces/IDocument'

import { createElement } from './utis/'
import { strip } from '.'

const addCharset = (element: HTMLElement): HTMLElement => {
  element.setAttribute('charset', 'utf-8')

  return element
}

export default async (
  context: IDocument
): Promise<IDocument> => {
  const element = createElement(context, "meta", addCharset)

  context = await strip(context, 'meta[charset]')

  context.document.head.appendChild(element)

  return context
}
