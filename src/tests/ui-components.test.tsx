import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Slider } from '../components/ui/Slider';
import { Select } from '../components/ui/Select';
import { ColorPicker } from '../components/ui/ColorPicker';

describe('UI Components', () => {
  describe('Card', () => {
    it('должен рендерить детей', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('должен применять glass класс по умолчанию', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toHaveClass('backdrop-blur-xl');
    });

    it('должен применять variant glow-warm', () => {
      const { container } = render(<Card variant="glow-warm">Content</Card>);
      expect(container.firstChild).toHaveClass('shadow-glow-warm');
    });

    it('должен применять variant glow-cool', () => {
      const { container } = render(<Card variant="glow-cool">Content</Card>);
      expect(container.firstChild).toHaveClass('shadow-glow-cool');
    });

    it('должен отключать glass эффект при glass=false', () => {
      const { container } = render(<Card glass={false}>Content</Card>);
      expect(container.firstChild).not.toHaveClass('backdrop-blur-xl');
    });
  });

  describe('Button', () => {
    it('должен рендерить детей', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('должен вызывать onClick при клике', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('должен применять primary variant по умолчанию', () => {
      const { container } = render(<Button>Button</Button>);
      expect(container.firstChild).toHaveClass('from-primary-warm');
    });

    it('должен применять secondary variant', () => {
      const { container } = render(<Button variant="secondary">Button</Button>);
      expect(container.firstChild).toHaveClass('glass');
    });

    it('должен применять ghost variant', () => {
      const { container } = render(<Button variant="ghost">Button</Button>);
      expect(container.firstChild).toHaveClass('text-white/70');
    });

    it('должен применять разные размеры', () => {
      const { container: sm } = render(<Button size="sm">Small</Button>);
      const { container: md } = render(<Button size="md">Medium</Button>);
      const { container: lg } = render(<Button size="lg">Large</Button>);

      expect(sm.firstChild).toHaveClass('text-sm');
      expect(md.firstChild).toHaveClass('text-base');
      expect(lg.firstChild).toHaveClass('text-lg');
    });
  });

  describe('Input', () => {
    it('должен рендерить label', () => {
      render(<Input label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('должен рендерить suffix', () => {
      render(<Input suffix="м" />);
      expect(screen.getByText('м')).toBeInTheDocument();
    });

    it('должен отображать error', () => {
      render(<Input error="This is required" />);
      expect(screen.getByText('This is required')).toBeInTheDocument();
    });

    it('должен применять error стили', () => {
      const { container } = render(<Input error="Error" />);
      expect(container.querySelector('input')).toHaveClass('ring-red-500/50');
    });

    it('должен передавать value и onChange', () => {
      const handleChange = vi.fn();
      render(<Input value="test" onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test');
      
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('должен работать с числовым типом', () => {
      const handleChange = vi.fn();
      render(<Input type="number" value={5} onChange={handleChange} suffix="м" />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue(5);
    });
  });

  describe('Slider', () => {
    it('должен рендерить label', () => {
      render(<Slider label="Volume" value={50} min={0} max={100} onChange={vi.fn()} />);
      expect(screen.getByText('Volume')).toBeInTheDocument();
    });

    it('должен отображать текущее значение', () => {
      render(<Slider value={75} min={0} max={100} onChange={vi.fn()} />);
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('должен отображать suffix', () => {
      render(<Slider value={5} min={0} max={10} suffix=" м" onChange={vi.fn()} />);
      expect(screen.getByText('5 м')).toBeInTheDocument();
    });

    it('должен вызывать onChange при изменении', () => {
      const handleChange = vi.fn();
      render(
        <Slider 
          value={50} 
          min={0} 
          max={100} 
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('slider');
      fireEvent.change(input, { target: { value: '75' } });
      expect(handleChange).toHaveBeenCalledWith(75);
    });

    it('должен применять warm glow по умолчанию', () => {
      const { container } = render(
        <Slider value={50} min={0} max={100} onChange={vi.fn()} />
      );
      expect(container.querySelector('.from-primary-warm')).toBeInTheDocument();
    });

    it('должен применять cool glow', () => {
      const { container } = render(
        <Slider value={50} min={0} max={100} onChange={vi.fn()} glow="cool" />
      );
      expect(container.querySelector('.from-primary-cool')).toBeInTheDocument();
    });
  });

  describe('Select', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    it('должен рендерить label', () => {
      render(
        <Select 
          label="Choose" 
          value="option1" 
          options={options} 
          onChange={vi.fn()} 
        />
      );
      expect(screen.getByText('Choose')).toBeInTheDocument();
    });

    it('должен отображать выбранное значение', () => {
      render(
        <Select 
          value="option1" 
          options={options} 
          onChange={vi.fn()} 
        />
      );
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('option1');
    });

    it('должен вызывать onChange при выборе', () => {
      const handleChange = vi.fn();
      render(
        <Select 
          value="option1" 
          options={options} 
          onChange={handleChange} 
        />
      );
      
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'option2' } });
      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('должен рендерить description для выбранного option', () => {
      const optionsWithDesc = [
        { value: 'opt1', label: 'Option 1', description: 'Description 1' },
        { value: 'opt2', label: 'Option 2', description: 'Description 2' },
      ];
      
      render(
        <Select 
          value="opt1" 
          options={optionsWithDesc} 
          onChange={vi.fn()} 
        />
      );
      
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });

    it('должен рендерить variant cards', () => {
      render(
        <Select 
          value="option1" 
          options={options} 
          onChange={vi.fn()} 
          variant="cards"
        />
      );
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('должен рендерить variant chips', () => {
      render(
        <Select 
          value="option1" 
          options={options} 
          onChange={vi.fn()} 
          variant="chips"
        />
      );
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('должен выделять выбранную карточку', () => {
      render(
        <Select 
          value="option1" 
          options={options} 
          onChange={vi.fn()} 
          variant="cards"
        />
      );
      
      const selectedCard = screen.getByText('Option 1').closest('button');
      expect(selectedCard).toHaveClass('bg-primary-warm/20');
    });
  });

  describe('ColorPicker', () => {
    const colorOptions = [
      { id: 'white', name: 'White', color: '#FFFFFF' },
      { id: 'beige', name: 'Beige', color: '#F5E6D3' },
      { id: 'gray', name: 'Gray', color: '#808080' },
    ];

    it('должен рендерить label', () => {
      render(
        <ColorPicker 
          label="Color" 
          value="white" 
          options={colorOptions} 
          onChange={vi.fn()} 
        />
      );
      expect(screen.getByText('Color')).toBeInTheDocument();
    });

    it('должен рендерить все опции цветов', () => {
      render(
        <ColorPicker 
          value="white" 
          options={colorOptions} 
          onChange={vi.fn()} 
        />
      );
      
      expect(screen.getByTitle('White')).toBeInTheDocument();
      expect(screen.getByTitle('Beige')).toBeInTheDocument();
      expect(screen.getByTitle('Gray')).toBeInTheDocument();
    });

    it('должен вызывать onChange при клике на цвет', () => {
      const handleChange = vi.fn();
      render(
        <ColorPicker 
          value="white" 
          options={colorOptions} 
          onChange={handleChange} 
        />
      );
      
      const beigeButton = screen.getByTitle('Beige');
      fireEvent.click(beigeButton);
      expect(handleChange).toHaveBeenCalledWith('beige');
    });

    it('должен выделять выбранный цвет', () => {
      render(
        <ColorPicker 
          value="gray" 
          options={colorOptions} 
          onChange={vi.fn()} 
        />
      );
      
      const grayButton = screen.getByTitle('Gray');
      expect(grayButton).toHaveClass('ring-2');
    });

    it('должен использовать variant squares', () => {
      render(
        <ColorPicker 
          value="white" 
          options={colorOptions} 
          onChange={vi.fn()} 
          variant="squares"
        />
      );
      
      const whiteButton = screen.getByTitle('White');
      expect(whiteButton).toHaveClass('rounded-lg');
    });
  });
});
