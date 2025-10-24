export class MenuItem {

  public idx: number | undefined;
  /**
   * Menu name
   */
  public name: string | undefined;

  /**
   * Menu link
   */
  public link: string | undefined;

  /**
   * Css class for font awesome icon
   */
  public awesomeIcon: string | undefined;

  constructor(idx?: number, name?: string, link?: string, awesomeIcon?: string) {
    this.idx = idx;
    this.name = name;
    this.link = link;
    this.awesomeIcon = awesomeIcon;
  }

}
