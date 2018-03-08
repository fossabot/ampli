import {
  addAmpScript,
  addCharset,
  convertToDom,
  strip,
} from './lib'
import IDocument from './lib/interfaces/IDocument'

const format = (formatString: string) => {
  return formatString.replace(/a/, 'b')
}

class Main {
  private html: string = ''
  private amp: string = ''
  private document: IDocument = {
    jsdom: null,
    window: null,
    document: null,
  }

  public async transform(html: string): Promise<string> {
    this.html = html

    this.document = await convertToDom(html)
    this.amp = await this.transformDocumentToAmp()

    return this.amp
  }

  private async transformDocumentToAmp(): Promise<string> {
    let document: IDocument;

    // Strip scripts
    document = await strip(this.document, 'script')

    // Set charset
    document = await addCharset(this.document)

    // Add AMP script
    document = await addAmpScript(this.document)

    // Export full HTML
    return document.jsdom.serialize()
  }
}

export default Main
